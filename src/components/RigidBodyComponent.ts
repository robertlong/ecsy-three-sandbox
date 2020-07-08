import { Component, Types } from "ecsy";

const identityMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

export class CollisionShape {
  id: number = 0;

  toJSON(): {} {
    return {};
  }
}

export class BoxShape extends CollisionShape {
  id: number
  shapeType: string;
  halfExtents: number[]

  constructor(halfExtents: number[]) {
    super();
    this.id = 0;
    this.shapeType = "box";
    this.halfExtents = halfExtents;
  }

  toJSON() {
    return {
      id: this.id,
      shapeType: this.shapeType,
      halfExtents: this.halfExtents
    };
  }
}

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