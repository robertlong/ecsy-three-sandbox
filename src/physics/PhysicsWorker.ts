import AmmoModuleFactory, { AmmoModule, btDiscreteDynamicsWorld, btTransform, btCollisionShape, btRigidBody, btVector3 } from "../../vendor/ammo.wasm.js";

export interface PhysicsWorkerMessage {
  type: string
}

export interface InitializedMessage extends PhysicsWorkerMessage {
  type: "initialized"
}

export interface PlaySimulationMessage extends PhysicsWorkerMessage {
  type: "play"
}

export interface PauseSimulationMessage extends PhysicsWorkerMessage {
  type: "pause"
}

export interface UpdateSimulationMessage extends PhysicsWorkerMessage {
  type: "update"
  buffer: ArrayBuffer
}

export interface CreateShapeMessage extends PhysicsWorkerMessage {
  type: "createShape"
  id: number
  shapeType: string
  [key: string]: any
}

export interface CreateRigidBodyMessage extends PhysicsWorkerMessage {
  type: "createRigidBody"
  id: number
  mass: number
  position: number[] // vec3
  rotation: number[] // quat
  centerOfMassOffset?: number[] // vec3
  shapeId: number
  localInertia?: number[] // vec3
}

let Ammo: AmmoModule;

class PhysicsWorker {
  dynamicsWorld: btDiscreteDynamicsWorld
  shapes: { [id: number]: btCollisionShape }
  rigidBodies: { [id: number]: btRigidBody }
  rigidBodiesArr: btRigidBody[]
  lastTime?: number;
  updateTimeout?: number;
  messageQueue: PhysicsWorkerMessage[]
  enabled: boolean;
  buffer?: ArrayBuffer;
  f32BufferView?: Float32Array;
  tempTransform: btTransform;

  static async initialize() {
    Ammo = await AmmoModuleFactory({
      locateFile(url) {
        if (url.endsWith(".wasm")) {
          return "/vendor/ammo.wasm.wasm";
        }

        return url;
      }
    });

    const collisionConfig = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfig);
    const overlappingPairCache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfig);

    const gravity = new Ammo.btVector3(0, -9.8, 0);
    dynamicsWorld.setGravity(gravity);

    const worker = new PhysicsWorker(dynamicsWorld);

    worker.sendMessage({
      type: "initialized"
    });
  }

  constructor(dynamicsWorld: btDiscreteDynamicsWorld) {
    this.dynamicsWorld = dynamicsWorld;
    this.shapes = {};
    this.rigidBodies = {};
    this.rigidBodiesArr = [];
    this.messageQueue = [];
    this.enabled = false;
    this.tempTransform = new Ammo.btTransform();
    this.buffer = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 7 * 128);
    this.f32BufferView = new Float32Array(this.buffer);
    (self as unknown as Worker).addEventListener("message", this.onMessage);
    this.update();
  }

  sendMessage(message: PhysicsWorkerMessage, transferables?: any[]) {
    (self as any).postMessage(message, transferables);
  }

  onMessage = (event: MessageEvent) => {
    const message = event.data as PhysicsWorkerMessage;
    this.messageQueue.push(message);
  }

  createShape(message: CreateShapeMessage) {
    let shape: btCollisionShape | undefined = undefined;

    if (message.shapeType === "box") {
      const [x, y, z] = message.halfExtents;
      const halfExtents = new Ammo.btVector3(x, y, z);
      shape = new Ammo.btBoxShape(halfExtents);
    } else if (message.shapeType === "sphere") {
      shape = new Ammo.btSphereShape(message.radius);
    }
    
    if (shape) {
      this.shapes[message.id] = shape;
    }
  } 

  createRigidBody(message: CreateRigidBodyMessage) {
    const initialTransform = new Ammo.btTransform();
    initialTransform.setIdentity();
    const position = new Ammo.btVector3(message.position[0], message.position[1], message.position[2]);
    const rotation = new Ammo.btQuaternion(message.rotation[0], message.rotation[1], message.rotation[2], message.rotation[3]);
    initialTransform.setOrigin(position);
    initialTransform.setRotation(rotation);

    let centerOfMassOffset: btTransform | undefined = undefined;

    if (message.centerOfMassOffset) {
      centerOfMassOffset = new Ammo.btTransform();
      centerOfMassOffset.setIdentity();
      const [x, y, z] = message.centerOfMassOffset;
      const offset = new Ammo.btVector3(x, y, z);
      centerOfMassOffset.setOrigin(offset);
    }

    const motionState = new Ammo.btDefaultMotionState(initialTransform, centerOfMassOffset);

    const collisionShape = this.shapes[message.shapeId];

    let localInertia: btVector3;

    if (message.localInertia) {
      const [x, y, z] = message.localInertia;
      localInertia = new Ammo.btVector3(x, y, z);
    } else {
      localInertia = new Ammo.btVector3(0, 0, 0);
    }

    collisionShape.calculateLocalInertia(message.mass, localInertia);
    
    const bodyInfo = new Ammo.btRigidBodyConstructionInfo(message.mass, motionState, collisionShape, localInertia);
    const body = new Ammo.btRigidBody(bodyInfo);

    body.activate();

    this.dynamicsWorld.addRigidBody(body);

    this.rigidBodies[message.id] = body;
    this.rigidBodiesArr.push(body);
  }

  update = () => {
    setTimeout(this.update, 16);

    let message;
    while ((message = this.messageQueue.shift()) !== undefined) {
      switch(message.type) {
        case "play":
          this.enabled = true;
          this.lastTime = performance.now();
          break;
        case "pause":
          this.enabled = false;
          break;
        case "createShape":
          this.createShape(message as CreateShapeMessage);
          break;
        case "createRigidBody":
          this.createRigidBody(message as CreateRigidBodyMessage);
          break;
        case "update":
          this.buffer = (message as UpdateSimulationMessage).buffer;
          this.f32BufferView = new Float32Array(this.buffer);
          break;
      }
    }

    if (this.enabled && this.f32BufferView && this.buffer) {
      const time = performance.now();
      const dt = time - this.lastTime!;
      this.lastTime = time;
      this.dynamicsWorld.stepSimulation(dt / 1000, 10);

      for (let i = 0; i < this.rigidBodiesArr.length; i++) {
        this.rigidBodiesArr[i].getMotionState().getWorldTransform(this.tempTransform);
        const origin = this.tempTransform.getOrigin();
        const rotation = this.tempTransform.getRotation();

        this.f32BufferView.set([
          origin.x(),
          origin.y(),
          origin.z(),
          rotation.x(),
          rotation.y(),
          rotation.z(),
          rotation.w()
        ], i * 7);        
      }

      this.sendMessage({ type: "update", buffer: this.buffer } as UpdateSimulationMessage, [this.buffer]);
      this.buffer = undefined;
      this.f32BufferView = undefined;
    }
  }
}

PhysicsWorker.initialize().catch(console.error);