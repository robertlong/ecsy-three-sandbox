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

import { VRButton } from "three/examples/jsm/webxr/VRButton";

import { WebGLRendererComponent } from "./components/WebGLRendererComponent";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";
import { InputFrameComponent } from "./components/InputFrameComponent";
import { WebXRSystemComponent } from "./components/WebXRSystemComponent";

import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { WebXRSystem } from "./systems/WebXRSystem";

export class App {
  world: ECSYThreeWorld;
  scene: Scene;
  sceneEntity: ECSYThreeEntity;
  camera: PerspectiveCamera;
  cameraEntity: ECSYThreeEntity;
  renderer: WebGLRenderer;
  rendererEntity: ECSYThreeEntity;
  leftControllerEntity: ECSYThreeEntity;
  rightControllerEntity: ECSYThreeEntity;

  static run(canvas: HTMLCanvasElement) {
    const app = new this(canvas);

    app
      .init()
      .then(() => {
        // TODO: Allow registering systems with before/after hooks.
        app.world
          .registerSystem(WebXRSystem)
          .registerSystem(WebGLRendererSystem);
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
      .registerComponent(WebXRControllerComponent, false)
      .registerComponent(WebXRSystemComponent)
      .registerComponent(InputFrameComponent, false);

    this.scene = new Scene();
    this.sceneEntity = this.world.createEntity().addObject3DComponent(this.scene);

    this.camera = new PerspectiveCamera();
    this.cameraEntity = this.world.createEntity().addObject3DComponent(this.camera, this.sceneEntity);

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });

    this.renderer.xr.enabled = true;

    const el = VRButton.createButton(this.renderer);
    this.renderer.domElement.parentElement?.appendChild(el);

    this.rendererEntity = this.world
      .createEntity()
      .addComponent(WebGLRendererComponent, {
        renderer: this.renderer,
        scene: this.sceneEntity,
        camera: this.cameraEntity,
      })
      .addComponent(WebXRSystemComponent)
      .addComponent(InputFrameComponent);

    // I want to be able to add components to these entities in init, so rather than doing this in a system, I'm doing it here.
    const rightControllerRayObj = this.renderer.xr.getController(0);
    const rightControllerGripObj = this.renderer.xr.getControllerGrip(0);
    const rightControllerGripEntity = this.world.createEntity().addObject3DComponent(rightControllerGripObj, this.sceneEntity);
    this.rightControllerEntity = this.world.createEntity().addObject3DComponent(rightControllerRayObj, this.sceneEntity).addComponent(WebXRControllerComponent, { index: 0, id: "rightHandController", grip: rightControllerGripEntity });
    
    const leftControllerRayObj = this.renderer.xr.getController(1);
    const leftControllerGripObj = this.renderer.xr.getControllerGrip(1);
    const leftControllerGripEntity = this.world.createEntity().addObject3DComponent(leftControllerGripObj, this.sceneEntity);
    this.leftControllerEntity = this.world.createEntity().addObject3DComponent(leftControllerRayObj, this.sceneEntity).addComponent(WebXRControllerComponent, { index: 1, id: "leftHandController", grip: leftControllerGripEntity });
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
