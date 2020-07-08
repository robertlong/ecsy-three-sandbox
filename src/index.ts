import {
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
  PlaneBufferGeometry,
  MathUtils,
} from "three";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { RotateSystem } from "./systems/RotateSystem";
import { OrbitControlsComponent } from "./components/OrbitControlsComponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RigidBodyInitializationSystem } from "./systems/RigidBodyInitializationSystem";
import { RigidBodyTransformSystem } from "./systems/RigidBodyTransformSystem";
import { RigidBodyComponent, BoxShape } from "./components/RigidBodyComponent";

class RotatingCubeExample extends App {
  async init() {
    await PhysicsSystem.load();

    const world = this.world;

    world
      .registerComponent(RotateComponent)
      .registerComponent(OrbitControlsComponent, false)
      .registerComponent(RigidBodyComponent);

    world
      .registerSystem(RigidBodyInitializationSystem)
      .registerSystem(PhysicsSystem)
      .registerSystem(RigidBodyTransformSystem)
      .registerSystem(RotateSystem);

    this.camera.position.z = 5;
    this.camera.position.y = 5;
    this.camera.lookAt(new Vector3());

    this.cameraEntity.addComponent(OrbitControlsComponent, {
      controls: new OrbitControls(this.camera, this.renderer.domElement),
    });

    const rightHandGrip = this.rightControllerEntity.getComponent(
      WebXRControllerComponent
    ).grip;
    const leftHandGrip = this.leftControllerEntity.getComponent(
      WebXRControllerComponent
    ).grip;

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(
          new BoxBufferGeometry(0.1, 0.1, 0.1),
          new MeshBasicMaterial({ color: 0xff0000 })
        ),
        rightHandGrip
      )
      .addComponent(RotateComponent, { axis: new Vector3(1, 1, 0) });

    world
      .createEntity()
      .addObject3DComponent(
        new Mesh(
          new BoxBufferGeometry(0.1, 0.1, 0.1),
          new MeshBasicMaterial({ color: 0x0000ff })
        ),
        leftHandGrip
      );

    const ground = new Mesh(
      new PlaneBufferGeometry(10, 10, 10),
      new MeshBasicMaterial({ color: 0xffffff })
    );
    ground.rotateX(MathUtils.degToRad(-90));

    world
      .createEntity()
      .addObject3DComponent(ground, this.sceneEntity)
      .addComponent(RigidBodyComponent, { shape: new BoxShape([5, 5, 0.001]) });

    const box = new Mesh(
      new BoxBufferGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    );

    box.position.y = 3;

    world
      .createEntity()
      .addObject3DComponent(box, this.sceneEntity)
      .addComponent(RigidBodyComponent, { shape: new BoxShape([0.5, 0.5, 0.5]), mass: 1 });
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = RotatingCubeExample.run(canvas);
