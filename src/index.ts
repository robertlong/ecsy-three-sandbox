import {
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
} from "three";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { RotateSystem } from "./systems/RotateSystem";
import { WebXRSystem } from "./systems/WebXRSystem";

// TODO: Fix dev tools

class RotatingCubeExample extends App {
  async init() {
    const world = this.world;

    world.registerComponent(RotateComponent);

    // TODO: Allow registering systems with before/after hooks.
    world
      .registerSystem(RotateSystem)
      .registerSystem(WebGLRendererSystem)
      .registerSystem(WebXRSystem);

    this.camera.position.z = 5;

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(new BoxBufferGeometry(), new MeshBasicMaterial()),
        this.sceneEntity
      )
      .addComponent(RotateComponent, { axis: new Vector3(1, 1, 0) });
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement
(window as unknown as any).app = RotatingCubeExample.run(canvas);
