import { Component, Types } from "ecsy";

export class WebXRSystemComponent extends Component<WebXRSystemComponent> {
  initialized!: boolean;

  static schema = {
    initialized: { type: Types.Boolean }
  };
}