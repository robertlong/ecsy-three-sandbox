
import { ECSYThreeSystem, Object3DComponent } from "ecsy-three";
import { Matrix4, Vector3, Quaternion } from "three";
import { RigidBodyComponent } from "../components/RigidBodyComponent";

const positionVec3 = new Vector3();
const rotationQuat = new Quaternion();
const scaleVec3 = new Vector3();

export class RigidBodyInitializationSystem extends ECSYThreeSystem {
  static queries = {
    rigidBodies: { components: [RigidBodyComponent, Object3DComponent] }
  };

  execute() {
    const rigidBodyEntities = this.queries.rigidBodies.results;

    for (let i = 0; i < rigidBodyEntities.length; i++) {
      const entity = rigidBodyEntities[i];
      const rigidBody = entity.getMutableComponent!(RigidBodyComponent);

      if (rigidBody.id !== 0) {
        continue;
      }

      const object3D = entity.getObject3D!();

      if (object3D.parent && object3D.parent.parent) {
        object3D.matrixWorld.decompose(positionVec3, rotationQuat, scaleVec3);
        positionVec3.toArray(rigidBody.position);
        rotationQuat.toArray(rigidBody.rotation);
      } else {
        object3D.position.toArray(rigidBody.position);
        object3D.quaternion.toArray(rigidBody.rotation);
      }
    }
  }
}