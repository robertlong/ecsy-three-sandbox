import { Component, Types } from "ecsy";

export class WebXRComponent extends Component<WebXRComponent> {
  initialized!: boolean;
  buttonEl?: HTMLElement

  static schema = {
    initialized: { type: Types.Boolean },
    buttonEl: { type: Types.Ref }
  };
}