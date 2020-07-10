import { ECSYThreeSystem } from "ecsy-three";
import { WebGLRendererComponent } from "../components/WebGLRendererComponent";

export class StaticShadowMapSystem extends ECSYThreeSystem {
  static queries = {
    renderers: { components: [WebGLRendererComponent] },
  };

  execute() {
    const entities = this.queries.renderers.results;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(WebGLRendererComponent);
      const renderer = component.renderer;
      renderer.shadowMap.autoUpdate = false;
    }
  }
}