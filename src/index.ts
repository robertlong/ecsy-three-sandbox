import {
  Object3DComponent,
  SceneTagComponent,
  CameraTagComponent,
  MeshTagComponent,
} from "ecsy-three";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
} from "three";

import { App } from "./App";

import { WebGLRendererComponent } from "./components/WebGLRendererComponent";
import { RotateComponent } from "./components/RotateComponent";

import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { RotateSystem } from "./systems/RotateSystem";

// TODO: Fix dev tools

class RotatingCubeExample extends App {
  async init() {
    const world = this.world;

    world
      .registerComponent(Object3DComponent)
      .registerComponent(SceneTagComponent)
      .registerComponent(MeshTagComponent)
      .registerComponent(CameraTagComponent)
      .registerComponent(WebGLRendererComponent, false)
      .registerComponent(RotateComponent);

    world.registerSystem(RotateSystem).registerSystem(WebGLRendererSystem);

    const scene = world
      .createEntity()
      .addObject3DComponent(new Scene(), false as any); // TODO: Make parent optional

    const cameraObj = new PerspectiveCamera();
    cameraObj.position.z = 5;

    const camera = world.createEntity().addObject3DComponent(cameraObj, scene);

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(new BoxBufferGeometry(), new MeshBasicMaterial()),
        scene
      )
      .addComponent(RotateComponent, { axis: new Vector3(1, 1, 0) });

    world.createEntity().addComponent(WebGLRendererComponent, {
      renderer: new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById("canvas") as HTMLCanvasElement,
      }),
      scene,
      camera,
    });
  }
}

RotatingCubeExample.run();
