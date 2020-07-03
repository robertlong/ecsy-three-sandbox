import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Component, Types } from "ecsy";

// Just holds a reference to the OrbitControls object. The OrbitControls .update() method is called automatically.
export class OrbitControlsComponent extends Component<OrbitControlsComponent> {
  controls!: OrbitControls

  static schema = {
    controls: { type: Types.Ref }
  };
}