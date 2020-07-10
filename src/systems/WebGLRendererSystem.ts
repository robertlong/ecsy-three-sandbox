import { ECSYThreeSystem } from "ecsy-three";
import { PerspectiveCamera } from "three";
import { WebGLRendererComponent } from "../components/WebGLRendererComponent";

export class WebGLRendererSystem extends ECSYThreeSystem {
  static queries = {
    renderers: { components: [WebGLRendererComponent] },
  };

  execute() {
    const entities = this.queries.renderers.results;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(WebGLRendererComponent);
      const camera = component.camera.getObject3D!<PerspectiveCamera>();
      const scene = component.scene.getObject3D!();
      const renderer = component.renderer;

      const canvas = renderer.domElement;

      const curPixelRatio = renderer.getPixelRatio();

      if (curPixelRatio !== window.devicePixelRatio) {
        renderer.setPixelRatio(window.devicePixelRatio);
      }

      const displayWidth  = Math.floor(canvas.clientWidth * window.devicePixelRatio);
      const displayHeight = Math.floor(canvas.clientHeight * window.devicePixelRatio);

      if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        camera.aspect = displayWidth / displayHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      }

      renderer.render(scene, camera);
      renderer.shadowMap.autoUpdate = false;
    }
  }
}