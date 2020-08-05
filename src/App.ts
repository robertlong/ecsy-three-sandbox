import {
  ECSYThreeWorld,
  ECSYThreeEntity,
} from "ecsy-three";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
} from "three";

import { VRButton } from "three/examples/jsm/webxr/VRButton";

import { WebGLRendererComponent } from "./components/WebGLRendererComponent";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";
import { InputFrameComponent } from "./components/InputFrameComponent";
import { WebXRSystemComponent } from "./components/WebXRSystemComponent";

import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { WebXRSystem } from "./systems/WebXRSystem";
import { PlayerTagComponent } from "./components/PlayerTagComponent";

export class App {
  world: ECSYThreeWorld;
  scene: Scene;
  sceneEntity: ECSYThreeEntity;
  player: Group;
  playerEntity: ECSYThreeEntity;
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
        app.play();
      })
      .catch(console.error);

    return app;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.world = new ECSYThreeWorld();

    this.world
      .registerComponent(PlayerTagComponent)
      .registerComponent(WebGLRendererComponent, false)
      .registerComponent(WebXRControllerComponent, false)
      .registerComponent(WebXRSystemComponent)
      .registerComponent(InputFrameComponent, false);

    this.scene = new Scene();
    this.sceneEntity = this.world.createEntity().addObject3DComponent(this.scene);

    this.player = new Group();
    this.player.name = "Player";
    this.playerEntity = this.world.createEntity().addObject3DComponent(this.player, this.sceneEntity).addComponent(PlayerTagComponent);

    this.camera = new PerspectiveCamera();
    this.camera.name = "MainCamera";
    this.camera.position.y = 1.6;
    this.cameraEntity = this.world.createEntity().addObject3DComponent(this.camera, this.playerEntity);

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
    rightControllerRayObj.name = "RightControllerRay";
    const rightControllerGripObj = this.renderer.xr.getControllerGrip(0);
    rightControllerRayObj.name = "RightControllerGrip";
    const rightControllerGripEntity = this.world.createEntity().addObject3DComponent(rightControllerGripObj, this.playerEntity);
    this.rightControllerEntity = this.world.createEntity().addObject3DComponent(rightControllerRayObj, this.playerEntity).addComponent(WebXRControllerComponent, { index: 0, id: "rightHandController", grip: rightControllerGripEntity });
    
    const leftControllerRayObj = this.renderer.xr.getController(1);
    leftControllerRayObj.name = "LeftControllerRay";
    const leftControllerGripObj = this.renderer.xr.getControllerGrip(1);
    leftControllerGripObj.name = "LeftControllerGrip";
    const leftControllerGripEntity = this.world.createEntity().addObject3DComponent(leftControllerGripObj, this.playerEntity);
    this.leftControllerEntity = this.world.createEntity().addObject3DComponent(leftControllerRayObj, this.playerEntity).addComponent(WebXRControllerComponent, { index: 1, id: "leftHandController", grip: leftControllerGripEntity });
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
