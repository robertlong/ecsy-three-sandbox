import { ECSYThreeWorld } from "ecsy-three";

export class App {
  world: ECSYThreeWorld;
  raf?: number;
  lastTime: number;

  static run(...args: any[]) {
    const app = new this(...args);

    app
      .init()
      .then(() => {
        app.play();
      })
      .catch(console.error);

    return app;
  }

  constructor(...args: any[]) {
    this.world = new ECSYThreeWorld();
    this.lastTime = 0;
  }

  async init() {}

  play() {
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.update);
  }

  pause() {
    cancelAnimationFrame(this.raf as number);
  }

  update = (time: number) => {
    const dt = time - this.lastTime;
    this.lastTime = time;
    // TODO: delta and time should be optional
    this.world.execute(dt, time);
    requestAnimationFrame(this.update);
  };
}
