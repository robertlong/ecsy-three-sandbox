import {
  ECSYThreeWorld,
  Object3DComponent,
  SceneTagComponent,
  CameraTagComponent,
  MeshTagComponent,
  ECSYThreeSystem,
  ECSYThreeEntity,
  ThreeTypes,
} from "ecsy-three";
import { Component, Types } from "ecsy";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Vector3,
} from "three";

// TODO: Fix dev tools

// TODO: Do we really need both this and the props on the component
interface WebGLRendererComponentProps {
  renderer: WebGLRenderer;
  scene: ECSYThreeEntity;
  camera: ECSYThreeEntity;
}

class WebGLRendererComponent extends Component<WebGLRendererComponentProps> {
  renderer!: WebGLRenderer; // TODO: Is it proper to use definite assignment on these?
  scene!: ECSYThreeEntity;
  camera!: ECSYThreeEntity;

  static schema = {
    renderer: { type: Types.Ref },
    scene: { type: Types.Ref },
    camera: { type: Types.Ref },
  };
}

class WebGLRendererSystem extends ECSYThreeSystem {
  static queries = {
    renderers: { components: [WebGLRendererComponent] },
  };

  execute() {
    const entities = this.queries.renderers.results;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(WebGLRendererComponent);

      const camera = component.camera.getObject3D<PerspectiveCamera>();
      const scene = component.scene.getObject3D();
      const renderer = component.renderer;
      
      const canvas = renderer.domElement;

      const curPixelRatio = renderer.getPixelRatio();

      if (curPixelRatio !== window.devicePixelRatio) {
        renderer.setPixelRatio(window.devicePixelRatio);
      }

      const displayWidth  = Math.floor(canvas.clientWidth * window.devicePixelRatio);
      const displayHeight = Math.floor(canvas.clientHeight * window.devicePixelRatio);

      if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        camera.aspect = displayWidth / displayHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      }

      renderer.render(scene, camera);
    }
  }
}

interface RotateComponentProps {
  axis?: Vector3; // NOTE: These are optional becase there are default values set.
  speed?: number;
}

class RotateComponent extends Component<RotateComponentProps> {
  axis!: Vector3;
  speed!: number;

  static schema = {
    axis: { type: ThreeTypes.Vector3Type, default: new Vector3(0, 1, 0) }, // TODO: this should just be ThreeTypes.Vector3
    speed: { type: Types.Number, default: 0.001 },
  };
}

class RotateSystem extends ECSYThreeSystem {
  static queries = {
    entities: { components: [RotateComponent, Object3DComponent] },
  };

  // TODO: delta should get type checked on abstract class
  execute(dt: number) {
    const entities = this.queries.entities.results;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(RotateComponent);
      const object = entity.getObject3D();
      object.rotateOnAxis(component.axis, component.speed * dt);
    }
  }
}

function init() {
  const world = new ECSYThreeWorld();

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

  const cube = world
    .createEntity()
    .addObject3DComponent(
      new Mesh(new BoxBufferGeometry(), new MeshBasicMaterial()),
      scene
    )
    .addComponent(RotateComponent, { axis: new Vector3(1, 1, 0) });

  const renderer = world.createEntity().addComponent(WebGLRendererComponent, {
    renderer: new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("canvas") as HTMLCanvasElement,
    }),
    scene,
    camera,
  });

  let lastTime = performance.now();

  function update(time: number) {
    const dt = time - lastTime;
    lastTime = time;
    // TODO: delta and time should be optional
    world.execute(dt, time);
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

init();
