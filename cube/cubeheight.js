import { CubeWidth } from "./cubewidth.js";

export class CubeHeight {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gap = 10;
    this.side = 100;
    this.yGap = this.side / 2;
    this.slantedSide = this.side * 0.8;

    this.CubeHeight = [];
  }
  resize() {
    this.CubeHeight = [];
    for (let i = 0; i < this.height; i++) {
      const items = new CubeWidth(
        this.x + (this.slantedSide + this.gap) * i,
        this.y + (this.yGap + this.gap) * i,
        this.width,
        this.gap,
        this.side,
        this.yGap,
        this.slantedSide
      );
      this.CubeHeight[i] = items;
    }
  }
  draw(ctx, mouse) {
    for (let i = 0; i < this.height; i++) {
      const items = this.CubeHeight[i];
      items.draw(ctx, mouse);
    }
  }
}
