import {
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
  PlaneBufferGeometry,
  MathUtils,
  ACESFilmicToneMapping,
  sRGBEncoding,
  MeshToonMaterial,
  DirectionalLight,
  Texture,
  MeshStandardMaterial,
  TextureLoader,
  NearestFilter,
  VSMShadowMap,
  PCFSoftShadowMap,
  BasicShadowMap,
  Color,
  SphereBufferGeometry,
  ShaderMaterial,
  BackSide,
  AmbientLight,
  Euler,
  DirectionalLightHelper,
  CameraHelper
} from "three";

import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { App } from "./App";

import { RotateComponent } from "./components/RotateComponent";

import { WebXRSystem } from "./systems/WebXRSystem";
import { WebGLRendererSystem } from "./systems/WebGLRendererSystem";
import { RotateSystem } from "./systems/RotateSystem";
import { WebXRControllerComponent } from "./components/WebXRControllerComponent";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RigidBodyInitializationSystem } from "./systems/RigidBodyInitializationSystem";
import { RigidBodyTransformSystem } from "./systems/RigidBodyTransformSystem";
import { RigidBodyComponent } from "./components/RigidBodyComponent";
import { ThreeBoundingBoxShape } from "./physics/ThreeCollisionShape";
import { SunlightComponent } from "./components/SunlightComponent";
import { SkyboxComponent } from "./components/SkyboxComponent";
import { DayNightComponent } from "./components/DayNightComponent";
import { DayNightSystem } from "./systems/DayNightSystem";
import { AmbientLightTagComponent } from "./components/AmbientLightTagComponent";
import { PlayerTagComponent } from "./components/PlayerTagComponent";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

 const scenes = [
  { id: "skycastle", url: "assets/models/SkyCastle/scene.gltf", startingPosition: new Vector3(25.5, 25.5, 41.5), startingPlayerRotation: new Euler(0, 1, 0), startingCameraRotation: new Euler(-0.3, 0, 0) },
  //{ id: "skycastle", url: "assets/models/SkyCastle/scene.gltf", startingPosition: new Vector3(100, 60, 75), startingPlayerRotation: new Euler(0, 1, 0), startingCameraRotation: new Euler(-0.3, 0, 0) },
  { id: "atrium", url: "assets/models/MozAtrium/MozAtrium.glb", startingPosition: new Vector3(), startingPlayerRotation: new Euler(), startingCameraRotation: new Euler(-0.3, 0, 0) },
  { id: "cave", url: "assets/models/WalrusCave/scene.gltf", startingPosition: new Vector3(20, 6.59, 1), startingPlayerRotation: new Euler(0, 1.55, 0), startingCameraRotation: new Euler(-0.3, 0, 0) },
  { id: "winter", url: "assets/models/LowPolyWinterScene/scene.gltf", startingPosition: new Vector3(0, 0, 2.76), startingPlayerRotation: new Euler(), startingCameraRotation: new Euler(-0.3, 0, 0) },
];

class ExampleApp extends App {
  async init() {
    const qs = new URLSearchParams(location.search);

    let sceneIndex = 0;

    if (qs.has("random")) {
      sceneIndex = Math.round(Math.random() * (scenes.length - 1));
    } else if (qs.has("scene")) {
      sceneIndex = scenes.findIndex((scene) => scene.id === qs.get("scene"))
    }
    
    const sceneInfo = scenes[sceneIndex];

    const [_, { scene: gltfScene }, gradientMap] = await Promise.all<void, GLTF, Texture>([
      PhysicsSystem.load(),
      new GLTFLoader()
        .loadAsync(sceneInfo.url),
      new TextureLoader()
        .setPath('assets/textures/gradient/')
        .loadAsync('threeTone.jpg')
    ]);

    gradientMap.minFilter = NearestFilter;
    gradientMap.magFilter = NearestFilter;


    const world = this.world;

    world
      .registerComponent(RotateComponent)
      .registerComponent(RigidBodyComponent)
      .registerComponent(AmbientLightTagComponent)
      .registerComponent(DayNightComponent)
      .registerComponent(SunlightComponent)
      .registerComponent(SkyboxComponent);
    
    world
      .registerSystem(DayNightSystem)
      .registerSystem(RigidBodyInitializationSystem)
      .registerSystem(PhysicsSystem)
      .registerSystem(RigidBodyTransformSystem)
      .registerSystem(RotateSystem)
      .registerSystem(WebXRSystem)
      .registerSystem(WebGLRendererSystem);

    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.shadowMap.type = VSMShadowMap;

    this.player.position.copy(sceneInfo.startingPosition);
    this.player.rotation.copy(sceneInfo.startingPlayerRotation);
    this.camera.rotation.copy(sceneInfo.startingCameraRotation);

    const rightHandGrip = this.rightControllerEntity.getComponent(
      WebXRControllerComponent
    ).grip;
    const leftHandGrip = this.leftControllerEntity.getComponent(
      WebXRControllerComponent
    ).grip;

    const leftHandObject = new Mesh(
      new BoxBufferGeometry(0.1, 0.1, 0.1),
      new MeshBasicMaterial({ color: 0xff0000 })
    );

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

    this.sceneEntity.addComponent(DayNightComponent);

    const vertexShader = `
      varying vec3 vWorldPosition;

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
    `;

    const fragmentShader = `
			uniform vec3 topColor;
			uniform vec3 bottomColor;
			uniform float offset;
			uniform float exponent;

			varying vec3 vWorldPosition;

			void main() {

				float h = normalize( vWorldPosition + offset ).y;
				gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

			}
    `;

    const uniforms = {
      "topColor": { value: new Color( 0x0077ff ) },
      "bottomColor": { value: new Color( 0xffffff ) },
      "offset": { value: 33 },
      "exponent": { value: 0.6 }
    };

    const skyGeo = new SphereBufferGeometry(500, 32, 15);
    const skyMat = new ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: BackSide
    });

    new PointerLockControls(this.camera)

    const skybox = new Mesh(skyGeo, skyMat);

    this.world.createEntity()
      .addObject3DComponent(skybox, this.sceneEntity)
      .addComponent(SkyboxComponent);

    this.world.createEntity()
      .addObject3DComponent(new AmbientLight(0xFFFFFF, 0.3), this.sceneEntity)
      .addComponent(AmbientLightTagComponent);

    const light = new DirectionalLight();
    light.castShadow = true;
    light.shadow.radius = 4;
    light.shadow.bias = -0.0002;
    light.shadow.normalBias = -0.0002;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    // (light as any)["helper"] = new DirectionalLightHelper(light, 10);

    // const cameraHelper = new CameraHelper( light.shadow.camera );
    // (light as any)["cameraHelper"] = cameraHelper;
    // this.scene.add( cameraHelper );

    // this.scene.add((light as any)["helper"]);

    world
      .createEntity()
      .addObject3DComponent(light, this.sceneEntity)
      .addComponent(SunlightComponent);

    gltfScene.traverse((object) => {
      const mesh = object as Mesh;

      if (mesh.material) {
        // TODO: Combine AO and Emissive if they exist
        // TODO: Medium shader using Phong Toon Shader
        // TODO: High shader using PBR Toon Shader
        // TODO: Ultra using PBR Toon Shader + Postprocessing
        mesh.material = new MeshToonMaterial({ color: 0xFFFFFF, map: (mesh.material as MeshStandardMaterial).map, gradientMap });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }

      if (object.userData.gltfExtensions && object.userData.gltfExtensions.MOZ_hubs_components) {
        const components = mesh.userData.gltfExtensions.MOZ_hubs_components;

        if (components["nav-mesh"] || (components.visible && !components.visible.visible)) {
          mesh.visible = false;
        }
      }
    });

    world
      .createEntity()
      .addObject3DComponent(gltfScene, this.sceneEntity);

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
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = ExampleApp.run(canvas);
