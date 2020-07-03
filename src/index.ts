import { Mesh, BoxBufferGeometry, MeshBasicMaterial, Vector3 } from "three";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { RotateSystem } from "./systems/RotateSystem";
import { WebXRSystem } from "./systems/WebXRSystem";
import { OrbitControlsComponent } from "./components/OrbitControlsComponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// TODO: Fix dev tools

class RotatingCubeExample extends App {
  async init() {
    const world = this.world;

    world
      .registerComponent(RotateComponent)
      .registerComponent(OrbitControlsComponent, false);

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

    this.cameraEntity.addComponent(OrbitControlsComponent, {
      controls: new OrbitControls(this.camera, this.renderer.domElement),
    });
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = RotatingCubeExample.run(canvas);
