import {  } from "three";
import { Component, Types } from "ecsy";
import { ECSYThreeEntity } from "ecsy-three";

// Just holds a reference to the OrbitControls object. The OrbitControls .update() method is called automatically.
export class WebXRControllerComponent extends Component<WebXRControllerComponent> {
  id!: string;
  index!: number;
  grip!: ECSYThreeEntity;
  connected!: boolean;

  static schema = {
    id: { type: Types.String },
    index: { type: Types.Number },
    grip: { type: Types.Ref },
    connected: { type: Types.Boolean }
  };
}