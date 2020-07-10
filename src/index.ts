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
  Color,
  SphereBufferGeometry,
  ShaderMaterial,
  BackSide,
  AmbientLight
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
import { StaticShadowMapSystem } from "./systems/StaticShadowMapSystem";

const scenes = [
  { url: "assets/models/MozAtrium/MozAtrium.glb", startingPosition: new Vector3() },
  { url: "assets/models/WalrusCave/scene.gltf", startingPosition: new Vector3(7.27, 5.38, 4.01) },
  { url: "assets/models/SkyCastle/scene.gltf", startingPosition: new Vector3(25.5, 25.5, 41.5) },
  { url: "assets/models/LowPolyWinterScene/scene.gltf", startingPosition: new Vector3(0, 0, 2.76) },
];

class ExampleApp extends App {
  async init() {
    const sceneIndex = Math.round(Math.random() * (scenes.length - 1));
    const { url: sceneUrl, startingPosition } = scenes[sceneIndex];

    const [_, { scene: gltfScene }, gradientMap] = await Promise.all<void, GLTF, Texture>([
      PhysicsSystem.load(),
      new GLTFLoader()
        .loadAsync(sceneUrl),
      new TextureLoader()
        .setPath('assets/textures/gradient/')
        .loadAsync('threeTone.jpg')
    ]);

    //this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = VSMShadowMap;

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

    const sky = new Mesh(skyGeo, skyMat);
    this.scene.add(sky);

    this.scene.add(new AmbientLight(0xFFFFFF, 0.3));


    const world = this.world;

    world
      .registerComponent(RotateComponent)
      .registerComponent(RigidBodyComponent);
    
    world
      .registerSystem(RigidBodyInitializationSystem)
      .registerSystem(PhysicsSystem)
      .registerSystem(RigidBodyTransformSystem)
      .registerSystem(RotateSystem)
      .registerSystem(WebXRSystem)
      .registerSystem(WebGLRendererSystem)
      .registerSystem(StaticShadowMapSystem);

    this.player.position.copy(startingPosition);

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

    // const ground = new Mesh(
    //   new PlaneBufferGeometry(10, 10, 10),
    //   new MeshBasicMaterial({ color: 0xffffff })
    // );
    // ground.rotateX(MathUtils.degToRad(-90));

    // world
    //   .createEntity()
    //   .addObject3DComponent(ground, this.sceneEntity)
    //   .addComponent(RigidBodyComponent, { shape: new ThreePlaneShape(ground) });

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

    gradientMap.minFilter = NearestFilter;
    gradientMap.magFilter = NearestFilter;


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

    const light = new DirectionalLight();
    light.target.position.set(0, 0, 1);
    light.add(light.target);
    light.rotation.set(MathUtils.degToRad(58.76), MathUtils.degToRad(20), MathUtils.degToRad(-25.31));
    light.position.set(35.5, 36.5, 41);
    light.castShadow = true;
    light.shadow.bias = -0.00002;
    light.shadow.normalBias = -0.00002;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.left = -121;
    light.shadow.camera.right = 173;
    light.shadow.camera.top = 131;
    light.shadow.camera.bottom = -202;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500; 

    world
      .createEntity()
      .addObject3DComponent(light, this.sceneEntity);

    world
      .createEntity()
      .addObject3DComponent(gltfScene, this.sceneEntity);
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
((window as unknown) as any).app = ExampleApp.run(canvas);
