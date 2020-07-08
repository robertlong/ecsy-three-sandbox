import {
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
  PlaneBufferGeometry,
  MathUtils,
  UnsignedByteType,
  DataTexture,
  PMREMGenerator,
  ACESFilmicToneMapping,
  sRGBEncoding
} from "three";

import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { RotateSystem } from "./systems/RotateSystem";
import { OrbitControlsComponent } from "./components/OrbitControlsComponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RigidBodyInitializationSystem } from "./systems/RigidBodyInitializationSystem";
import { RigidBodyTransformSystem } from "./systems/RigidBodyTransformSystem";
import { RigidBodyComponent } from "./components/RigidBodyComponent";
import { ThreeBoundingSphereShape, ThreeBoundingBoxShape, ThreePlaneShape } from "./physics/ThreeCollisionShape";

class RotatingCubeExample extends App {
  async init() {
    const [_, envTexture, { scene: helmet }] = await Promise.all<void, DataTexture, GLTF>([
      PhysicsSystem.load(),
      new RGBELoader()
        .setDataType(UnsignedByteType)
        .setPath('assets/textures/environment/')
        .loadAsync('royal_esplanade_1k.hdr'),
      new GLTFLoader()
        .setPath("assets/models/DamagedHelmet/")
        .loadAsync("DamagedHelmet.glb")
    ]);

    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = sRGBEncoding;

    const pmremGenerator = new PMREMGenerator(this.renderer);
		pmremGenerator.compileEquirectangularShader();

    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;

    this.scene.environment = envMap;
    this.scene.background = envMap;

    envTexture.dispose();
		pmremGenerator.dispose();

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
      .addComponent(RigidBodyComponent, { shape: new ThreePlaneShape(ground) });

    const box = new Mesh(
      new BoxBufferGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    );

    box.position.y = 3;
    box.position.z = -0.5

    world
      .createEntity()
      .addObject3DComponent(box, this.sceneEntity)
      .addComponent(RigidBodyComponent, { shape: new ThreeBoundingBoxShape(box), mass: 1 });

    helmet.position.set(0.5, 1, -0.3);
    helmet.scale.set(0.25, 0.25, 0.25)

    world
      .createEntity()
      .addObject3DComponent(helmet, this.sceneEntity)
      .addComponent(RigidBodyComponent, { shape: new ThreeBoundingSphereShape(helmet) });
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = RotatingCubeExample.run(canvas);
