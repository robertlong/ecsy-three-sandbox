import { Component, Types } from "ecsy";
import { ECSYThreeEntity } from "ecsy-three";
import { WebGLRenderer } from "three";

export class WebGLRendererComponent extends Component<WebGLRendererComponent> {
  renderer!: WebGLRenderer;
  scene!: ECSYThreeEntity;
  camera!: ECSYThreeEntity;

  static schema = {
    renderer: { type: Types.Ref },
    scene: { type: Types.Ref },
    camera: { type: Types.Ref },
  };
}