import { Component, Types } from "ecsy";

export function toTimeMiliseconds(hour: number, minute: number = 0, second: number = 0, milisecond: number = 0) {
  return (hour * 3600000) + (minute * 60000) + (second * 1000) + milisecond;
}

export class DayNightComponent extends Component<DayNightComponent> {
  time!: number; // Day time in miliseconds 24h * 60m * 60s * 1000ms
  dayLengthSeconds!: number;
  sunDistance!: number;
  shadowCastersUpdated!: boolean;

  static schema = {
    time: { type: Types.Number, default: toTimeMiliseconds(9) },
    dayLengthSeconds: { type: Types.Number, default: 30 },
    sunDistance: { type: Types.Number, default: 100 },
    shadowCastersUpdated: { type: Types.Boolean, default: true }
  };
}