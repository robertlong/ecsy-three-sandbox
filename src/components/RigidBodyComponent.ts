import { Component, Types } from "ecsy";
import { CollisionShape } from "../physics/CollisionShape"; 

export class RigidBodyComponent extends Component<RigidBodyComponent> {
  id!: number;
  mass!: number
  position!: number[] // vec3
  rotation!: number[] // quat
  centerOfMassOffset?: number[] // vec3
  shape!: CollisionShape
  localInertia?: number[] // vec3

  static schema = {
    id: { type: Types.Number },
    mass: { type: Types.Number },
    position: { type: Types.Array, default: [0, 0, 0] },
    rotation: { type: Types.Array, default: [0, 0, 0, 1] },
    centerOfMassOffset: { type: Types.Array, default: undefined },
    shape: { type: Types.Ref },
    localInertia: { type: Types.Array, default: undefined }
  };

  toJSON() {
    return {
      id: this.id,
      mass: this.mass,
      position: this.position,
      rotation: this.rotation,
      centerOfMassOffset: this.centerOfMassOffset,
      shapeId: this.shape.id,
      localInertia: this.localInertia
    };
  }
}