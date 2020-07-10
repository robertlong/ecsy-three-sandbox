import { DirectionalLight } from "three";
import {
  ECSYThreeSystem,
  Object3DComponent,
  SceneTagComponent,
} from "ecsy-three";
import { DayNightComponent } from "../components/DayNightComponent";
import { SunlightComponent } from "../components/SunlightComponent";
import { SkyboxComponent } from "../components/SkyboxComponent";
import { AmbientLightTagComponent } from "../components/AmbientLightTagComponent";
import { PlayerTagComponent } from "../components/PlayerTagComponent";

const MS_IN_A_DAY = 8640000;

export class DayNightSystem extends ECSYThreeSystem {
  static queries = {
    sceneEntities: { components: [SceneTagComponent, Object3DComponent] },
    playerEntities: { components: [PlayerTagComponent, Object3DComponent] },
    dayNightEntities: { components: [DayNightComponent] },
    ambientLightEntities: {
      components: [AmbientLightTagComponent, Object3DComponent],
    },
    sunlightEntities: { components: [SunlightComponent, Object3DComponent] },
    skyboxEntities: { components: [SkyboxComponent, Object3DComponent] },
  };

  execute(dt: number) {
    const sceneEntities = this.queries.sceneEntities.results;
    const dayNightEntities = this.queries.dayNightEntities.results;
    const sunlightEntities = this.queries.sunlightEntities.results;
    const skyboxEntities = this.queries.skyboxEntities.results;
    const ambientLightEntities = this.queries.ambientLightEntities.results;
    const playerEntities = this.queries.playerEntities.results;

    if (
      sceneEntities.length > 0 &&
      dayNightEntities.length > 0 &&
      sunlightEntities.length > 0 &&
      skyboxEntities.length > 0 &&
      ambientLightEntities.length > 0 &&
      playerEntities.length > 0
    ) {
      const sceneEntity = sceneEntities[0];
      const dayNightEntity = dayNightEntities[0];
      const sunlightEntity = sunlightEntities[0];
      const skyboxEntity = skyboxEntities[0];
      const ambientLightEntity = ambientLightEntities[0];
      const playerEntity = playerEntities[0];

      const dayNight = dayNightEntity.getComponent(DayNightComponent);
      const sunObj = sunlightEntity.getObject3D!() as DirectionalLight;
      const ambientLight = ambientLightEntity.getObject3D!();
      const skybox = skyboxEntity.getObject3D!();
      const player = playerEntity.getObject3D!();
      const scene = sceneEntity.getObject3D!();

      if (dayNight.shadowCastersUpdated) {
        // TODO: resize the shadow frustum 
        dayNight.shadowCastersUpdated = false;
      }

      const irlDayLength = dayNight.dayLengthSeconds * 1000;
      const irlToInGame = MS_IN_A_DAY / irlDayLength;
      const inGameTimeElapsed = dt * irlToInGame;

      dayNight.time = (dayNight.time + inGameTimeElapsed) % MS_IN_A_DAY;

      const dayProgress = dayNight.time / MS_IN_A_DAY;
      const sunRotation = Math.PI * 2 * dayProgress;

      sunObj.position.setFromSphericalCoords(dayNight.sunDistance, sunRotation, Math.PI / 2);      
      
      // (sunObj as any).helper.update();
      // (sunObj as any).cameraHelper.update();
    }
  }
}
