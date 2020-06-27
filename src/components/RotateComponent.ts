import { Vector3 } from "three";
import { Component, Types } from "ecsy";
import { ThreeTypes } from "ecsy-three";

interface RotateComponentProps {
  axis?: Vector3; // NOTE: These are optional becase there are default values set.
  speed?: number;
}

export class RotateComponent extends Component<RotateComponentProps> {
  axis!: Vector3;
  speed!: number;

  static schema = {
    axis: { type: ThreeTypes.Vector3Type, default: new Vector3(0, 1, 0) }, // TODO: this should just be ThreeTypes.Vector3
    speed: { type: Types.Number, default: 0.001 },
  };
}