import { Component, Types } from "ecsy";
import { Vector2, Vector3, Euler, Quaternion, Matrix3, Matrix4 } from "three";

export type InputFrameValue = null | number | boolean | string | Vector2 | Vector3 | Euler | Quaternion | Matrix3 | Matrix4;

export interface InputFrame {
  [deviceId: string]: { [key: string]: InputFrameValue }
}

export class InputFrameComponent extends Component<InputFrameComponent> {
  frame!: InputFrame

  static schema = {
    frame: { type: Types.JSON, default: {} }
  };
}