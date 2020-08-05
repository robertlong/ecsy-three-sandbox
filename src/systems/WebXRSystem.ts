import { ECSYThreeSystem } from "ecsy-three";
import { Event as ThreeEvent } from "three";
import { WebXRControllerComponent } from "../components/WebXRControllerComponent";
import { InputFrameComponent, InputFrameValue, InputFrame } from "../components/InputFrameComponent";
import { WebXRSystemComponent } from "../components/WebXRSystemComponent";

function createControllerInputHandler(inputFrame: InputFrame, key: string, value: InputFrameValue) {
  return (event: ThreeEvent) => {
    const entity = event.target.entity;

    if (!entity) {
      return;
    }

    const controller = entity.getComponent(WebXRControllerComponent);

    inputFrame[controller.id][key] = value;
  };
}

export class WebXRSystem extends ECSYThreeSystem {
  static queries = {
    webxrSystemEntities: { components: [WebXRSystemComponent] },
    controllerEntities: { components: [WebXRControllerComponent] },
    inputFrameEntities: { components: [InputFrameComponent] }
  };

  execute() {
    const webxrSystemEntity = this.queries.webxrSystemEntities.results[0];

    if (!webxrSystemEntity) {
      return;
    }

    const inputFrameEntity = this.queries.inputFrameEntities.results[0];

    if (!inputFrameEntity) {
      throw new Error("WebXRSystem requires an InputFrameComponent to write to");
    }

    const systemState = webxrSystemEntity.getMutableComponent!(WebXRSystemComponent);

    if (systemState.initialized) {
      return;
    }

    systemState.initialized = true;

    const inputFrame = inputFrameEntity.getComponent!(InputFrameComponent).frame;

    const controllerEntities = this.queries.controllerEntities.results;

    for (let i = 0; i < controllerEntities.length; i++) {
      const entity = controllerEntities[i];
      const object = entity.getObject3D!();
      object.addEventListener("selectstart", createControllerInputHandler(inputFrame, "select", true));
      object.addEventListener("squeezestart", createControllerInputHandler(inputFrame, "squeeze", true));
      object.addEventListener("selectend", createControllerInputHandler(inputFrame, "select", false));
      object.addEventListener("squeezeend", createControllerInputHandler(inputFrame, "squeeze", false));
      object.addEventListener("connected", (event) => {
        const entity = event.target.entity;

        if (entity) {
          const controller = entity.getComponent(WebXRControllerComponent);
          controller.connected = true;
        }
      });
      object.addEventListener("disconnected", (event) => {
        const entity = event.target.entity;

        if (entity) {
          const controller = entity.getComponent(WebXRControllerComponent);
          controller.connected = false;
          inputFrame[controller.id].select = false;
          inputFrame[controller.id].squeeze = false;
        }
      });

      const controller = entity.getComponent!(WebXRControllerComponent);
      inputFrame[controller.id] = {
        select: false,
        squeeze: false
      };
    }
  }
}