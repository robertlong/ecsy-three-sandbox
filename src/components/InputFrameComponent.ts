import { Component, Types } from "ecsy";

export class InputFrameComponent extends Component<InputFrameComponent> {
  frame!: { [key: string]: any }

  static schema = {
    frame: { type: Types.JSON, default: {} }
  };
}