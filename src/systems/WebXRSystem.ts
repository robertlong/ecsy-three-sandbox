import { ECSYThreeSystem, Object3DComponent } from "ecsy-three";
import { VRButton } from "three/examples/jsm/webxr/VRButton";
import { WebGLRendererComponent } from "../components/WebGLRendererComponent";
import { WebXRComponent } from "../components/WebXRComponent";

export class WebXRSystem extends ECSYThreeSystem {
  static queries = {
    entities: { components: [WebGLRendererComponent, WebXRComponent] },
  };

  execute() {
    const entities = this.queries.entities.results;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const webxrComponent = entity.getComponent(WebXRComponent);
     
      if (!webxrComponent.initialized) {
        const rendererComponent = entity.getComponent(WebGLRendererComponent);
        const renderer = rendererComponent.renderer;
        const el = VRButton.createButton(renderer);
        renderer.domElement.parentElement?.appendChild(el);
        webxrComponent.buttonEl = el;
        webxrComponent.initialized = true;
      }
    }
  }
}