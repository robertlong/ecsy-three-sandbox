import Ammo, { AmmoModule } from "../../vendor/ammo.wasm.js";

export interface PhysicsWorkerMessage {
  type: string
}

export class PhysicsWorker {
  ctx: Worker;
  ammo?: AmmoModule

  constructor(ctx: Worker) {
    this.ctx = ctx;
    this.ctx.addEventListener("message", this.onMessage);
    this.initialize();
  }

  initialize() {
    Ammo().then((ammo) => {
      this.ammo = ammo;
      this.sendMessage({
        type: "initialized"
      });
    });
  }

  sendMessage(message: PhysicsWorkerMessage) {
    this.ctx.postMessage(message);
  }

  onMessage = (event: MessageEvent) => {
    const message = event.data as PhysicsWorkerMessage;

    switch(message.type) {

    }
  }
}

// TODO: use worker global scope instead of worker type.
// https://github.com/Microsoft/TypeScript/issues/20595
new PhysicsWorker(self as unknown as Worker);