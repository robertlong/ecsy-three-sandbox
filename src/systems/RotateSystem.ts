import { ECSYThreeSystem, Object3DComponent } from "ecsy-three";
import { RotateComponent } from "../components/RotateComponent";

export class RotateSystem extends ECSYThreeSystem {
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