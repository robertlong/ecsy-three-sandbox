import { BoxShape, SphereShape } from "../physics/CollisionShape";
import { Object3D, Box3, Vector3, Sphere, Quaternion, Matrix4 } from "three";

const box = new Box3();
const sphere = new Sphere();
const vec3 = new Vector3();
const matrix = new Matrix4();
const invMatrix = new Matrix4();
const translationVec3 = new Vector3();
const scaleVec3 = new Vector3();
const rotationQuat = new Quaternion();

export class ThreeBoundingBoxShape extends BoxShape {
  constructor(object: Object3D) {
    box.makeEmpty();
    box.expandByObject(object);
    box.getSize(vec3);
    super([vec3.x / 2, vec3.y / 2, vec3.z / 2]);
  }
}

export class ThreeBoundingSphereShape extends SphereShape {
  constructor(object: Object3D) {
    box.makeEmpty();
    box.expandByObject(object);
    box.getBoundingSphere(sphere);
    super(sphere.radius);
  }
}

export class ThreePlaneShape extends BoxShape {
  constructor(object: Object3D) {
    rotationQuat.copy(object.quaternion);
    matrix.copy(object.matrixWorld);
    matrix.getInverse(invMatrix);
    invMatrix.decompose(translationVec3, object.quaternion, scaleVec3);

    box.makeEmpty();
    box.expandByObject(object);
    box.getSize(vec3);

    object.quaternion.copy(rotationQuat);
    
    super([Math.max(vec3.x / 2, 0.001), Math.max(vec3.y / 2, 0.001), Math.max(vec3.z / 2, 0.001)]);
  }
}