import { Component, Types } from "ecsy";
import { ECSYThreeEntity } from "ecsy-three";
import { WebGLRenderer } from "three";

// TODO: Do we really need both this and the props on the component
interface WebGLRendererComponentProps {
  renderer: WebGLRenderer;
  scene: ECSYThreeEntity;
  camera: ECSYThreeEntity;
}

export class WebGLRendererComponent extends Component<WebGLRendererComponentProps> {
  renderer!: WebGLRenderer; // TODO: Is it proper to use definite assignment on these?
  scene!: ECSYThreeEntity;
  camera!: ECSYThreeEntity;

  static schema = {
    renderer: { type: Types.Ref },
    scene: { type: Types.Ref },
    camera: { type: Types.Ref },
  };
}