import {
  ECSYThreeWorld,
  Object3DComponent,
  SceneTagComponent,
  CameraTagComponent,
  MeshTagComponent,
  ECSYThreeEntity,
} from "ecsy-three";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
} from "three";

import { WebGLRendererComponent } from "./components/WebGLRendererComponent";
import { WebXRComponent } from "./components/WebXRComponent";

export class App {
  world: ECSYThreeWorld;
  scene: Scene;
  sceneEntity: ECSYThreeEntity;
  camera: PerspectiveCamera;
  cameraEntity: ECSYThreeEntity;
  renderer: WebGLRenderer;
  rendererEntity: ECSYThreeEntity;

  static run(canvas: HTMLCanvasElement) {
    const app = new this(canvas);

    app
      .init()
      .then(() => {
        app.play();
      })
      .catch(console.error);

    return app;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.world = new ECSYThreeWorld();

    this.world
      .registerComponent(Object3DComponent)
      .registerComponent(SceneTagComponent)
      .registerComponent(MeshTagComponent)
      .registerComponent(CameraTagComponent)
      .registerComponent(WebGLRendererComponent, false)
      .registerComponent(WebXRComponent, false);

    this.scene = new Scene();
    this.sceneEntity = this.world.createEntity().addObject3DComponent(this.scene);

    this.camera = new PerspectiveCamera();
    

    this.cameraEntity = this.world.createEntity().addObject3DComponent(this.camera, this.sceneEntity);

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });

    this.renderer.xr.enabled = true;

    this.rendererEntity = this.world
      .createEntity()
      .addComponent(WebGLRendererComponent, {
        renderer: this.renderer,
        scene: this.sceneEntity,
        camera: this.cameraEntity,
      })
      .addComponent(WebXRComponent);
  }

  async init() {}

  play() {
    this.renderer.setAnimationLoop(this.update);
  }

  pause() {
    this.renderer.setAnimationLoop(null);
  }

  update = () => {
    this.world.execute();
  };
}
