import { Mesh, BoxBufferGeometry, MeshBasicMaterial, Vector3 } from "three";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { RotateSystem } from "./systems/RotateSystem";
import { OrbitControlsComponent } from "./components/OrbitControlsComponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";

class RotatingCubeExample extends App {
  async init() {
    const world = this.world;

    world
      .registerComponent(RotateComponent)
      .registerComponent(OrbitControlsComponent, false);

    world.registerSystem(RotateSystem);
      
    this.camera.position.z = 5;

    this.cameraEntity.addComponent(OrbitControlsComponent, {
      controls: new OrbitControls(this.camera, this.renderer.domElement),
    });

    const rightHandGrip = this.rightControllerEntity.getComponent(WebXRControllerComponent).grip;
    const leftHandGrip = this.leftControllerEntity.getComponent(WebXRControllerComponent).grip;

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(new BoxBufferGeometry(0.1, 0.1, 0.1), new MeshBasicMaterial({ color: 0xFF0000 })),
        rightHandGrip
      )
      .addComponent(RotateComponent, { axis: new Vector3(1, 1, 0) });

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(new BoxBufferGeometry(0.1, 0.1, 0.1), new MeshBasicMaterial({ color: 0x0000FF })),
        leftHandGrip
      );
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = RotatingCubeExample.run(canvas);
