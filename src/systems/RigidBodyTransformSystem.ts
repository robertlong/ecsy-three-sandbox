
import { ECSYThreeSystem, Object3DComponent } from "ecsy-three";
import { Matrix4, Vector3, Quaternion } from "three";
import { RigidBodyComponent } from "../components/RigidBodyComponent";

const matrix = new Matrix4();
const inverseMatrix = new Matrix4();
const positionVec3 = new Vector3();
const rotationQuat = new Quaternion();

export class RigidBodyTransformSystem extends ECSYThreeSystem {
  static queries = {
    rigidBodies: { components: [RigidBodyComponent, Object3DComponent] }
  };

  execute() {
    const rigidBodyEntities = this.queries.rigidBodies.results;

    for (let i = 0; i < rigidBodyEntities.length; i++) {
      const entity = rigidBodyEntities[i];
      const rigidBody = entity.getComponent!(RigidBodyComponent);
      const object3D = entity.getObject3D!();

      if (object3D.parent && object3D.parent.parent) {
        positionVec3.fromArray(rigidBody.position);
        rotationQuat.fromArray(rigidBody.rotation);
        matrix.compose(positionVec3, rotationQuat, object3D.scale);
        object3D.parent.updateWorldMatrix(true, false);
        inverseMatrix.getInverse(object3D.parent.matrixWorld);
        matrix.premultiply(inverseMatrix);
        matrix.decompose(object3D.position, object3D.quaternion, object3D.scale);
      } else {
        object3D.position.fromArray(rigidBody.position);
        object3D.quaternion.fromArray(rigidBody.rotation);
      }
    }
  }
}