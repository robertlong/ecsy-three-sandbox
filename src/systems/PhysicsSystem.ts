import { System } from "ecsy";
import { PhysicsWorkerMessage } from "../physics/PhysicsWorker";
let physicsWorker: any;
let loadingPromise: any;

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

  execute() {
    // Dont run if the PhysicsWorker hasn't been loaded yet.
    if (!physicsWorker) {
      return;
    }
  }
}