import { Cube } from "./cube.js";

export class CubeWidth {
  constructor(x, y, width, gap, side, yGap, slantedSide) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.gap = gap;
    this.side = side;
    this.yGap = yGap;
    this.slantedSide = slantedSide;

    this.cubeWidth = [];
  }
  resize() {
    this.cubeWidth = [];
    for (let i = 0; i < this.width; i++) {
      const item = new Cube(
        this.x - (this.slantedSide + this.gap) * i,
        this.y + (this.yGap + this.gap) * i,
        this.side,
        this.yGap,
        this.slantedSide
      );
      this.cubeWidth[i] = item;
    }
  }
  draw(ctx, mouse) {
    this.resize();
    for (let i = 0; i < this.width; i++) {
      const item = this.cubeWidth[i];
      item.update(ctx, mouse);
    }
  }
}
