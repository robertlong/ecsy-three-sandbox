import { Vector3 } from "three";
import { Component, Types } from "ecsy";
import { ThreeTypes } from "ecsy-three";

export class RotateComponent extends Component<RotateComponent> {
  axis!: Vector3;
  speed!: number;

  static schema = {
    axis: { type: ThreeTypes.Vector3Type, default: new Vector3(0, 1, 0) }, // TODO: this should just be ThreeTypes.Vector3
    speed: { type: Types.Number, default: 0.001 },
  };
}