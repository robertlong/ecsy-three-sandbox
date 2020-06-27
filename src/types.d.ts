import { _Entity, Entity } from "ecsy";
import { Object3D } from "three";

// TODO: This needs to be exported from the ecsy-three library
declare module "ecsy-three" {
  export interface ECSYThreeObject3D {
    entity: ECSYThreeEntity
  }
  
  export class ECSYThreeEntity extends _Entity {
    addObject3DComponent(obj: Object3D, parentEntity: Entity): this
    removeObject3DComponent(unparent: boolean): void
    remove(forceImmediate: boolean): void
    getObject3D<T extends Object3D>(): T & ECSYThreeObject3D
  }
}
