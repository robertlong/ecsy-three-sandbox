import { PhysicsWorkerMessage, UpdateSimulationMessage } from "../physics/PhysicsWorker";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { System } from "ecsy";


let physicsWorker: Worker;
let loadingPromise: any;
let nextShapeId: number = 1;
let nextRigidBodyId: number = 1;

function copyIntoArray(src: ArrayLike<any>, dest: any[], offset: number) {
  for (let i = 0; i < dest.length; i++) {
    dest[i] = src[offset + i];
  }
}

export class PhysicsSystem extends System {
  // You must call PhysicsSystem.load() directly with the path to the physics worker script and ammo WASM url.
  static load() {
    if (!loadingPromise) {
      loadingPromise = new Promise((resolve, reject) => {
        const worker = new Worker("../physics/PhysicsWorker.js", { type: "module" });

        function onMessage(event: MessageEvent) {
          const message = event.data as PhysicsWorkerMessage;

          if (message.type !== "initialized") {
            return;
          }

          worker.postMessage({
            type: "play"
          });

          physicsWorker = worker;
          worker.removeEventListener("message", onMessage);
          worker.removeEventListener("error", onError);
          resolve();
        }

        function onError(event: ErrorEvent) {
          console.error("Error loading PhysicsWorker:", event.message || "unknown error");
          worker.removeEventListener("message", onMessage);
          worker.removeEventListener("error", onError);
          reject(event.error);
        }

        worker.addEventListener("message", onMessage);
        worker.addEventListener("error", onError);
      });
    }
    
    return loadingPromise;
  }

  static queries = {
    rigidBodies: { components: [RigidBodyComponent] }
  };

  initializedWorker: boolean = false;
  buffer?: ArrayBuffer;
  f32BufferView?: Float32Array;

  onMessage = (event: MessageEvent) => {
    const message = event.data as PhysicsWorkerMessage;


    if (message.type === "update") {
      this.buffer = (message as UpdateSimulationMessage).buffer;
      this.f32BufferView = new Float32Array(this.buffer);
    }
  }

  execute(dt: number, time: number) {
    // Dont run if the PhysicsWorker hasn't been loaded yet.
    if (!physicsWorker) {
      return;
    }

    if (!this.initializedWorker) {
      physicsWorker.addEventListener("message", this.onMessage);
      this.initializedWorker = true;
    }

    const rigidBodyEntities = this.queries.rigidBodies.results;

    for (let i = 0; i < rigidBodyEntities.length; i++) {
      const entity = rigidBodyEntities[i];
      const rigidBody = entity.getMutableComponent!(RigidBodyComponent);

      if (rigidBody.id === 0) {
        const shape = rigidBody.shape;

        if (shape.id === 0) {
          shape.id = nextShapeId++;

          physicsWorker.postMessage({
            type: "createShape",
            ...shape.toJSON()
          });
        }

        rigidBody.id = nextRigidBodyId++;

        physicsWorker.postMessage({
          type: "createRigidBody",
          ...rigidBody.toJSON()
        });
      }

      if (rigidBody.id > 0 && this.f32BufferView) {
        copyIntoArray(this.f32BufferView, rigidBody.position, (rigidBody.id - 1) * 7);
        copyIntoArray(this.f32BufferView, rigidBody.rotation, (rigidBody.id - 1) * 7 + 3);
      }
    }

    if (this.buffer) {
      physicsWorker.postMessage({
        type: "update",
        buffer: this.buffer
      });
  
      this.buffer = undefined;
      this.f32BufferView = undefined;
    }
  }
}