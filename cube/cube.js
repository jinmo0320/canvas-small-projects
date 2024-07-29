export class Cube {
  constructor(x, y, side, yGap, slantedSide) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.side = side;
    this.yGap = yGap;
    this.slantedSide = slantedSide;

    this.surfaceColor = "#48dbfb";

    this.cur = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.surfaceColor;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.slantedSide, this.y - this.yGap);
    ctx.lineTo(this.x, this.y - this.yGap - this.yGap);
    ctx.lineTo(this.x - this.slantedSide, this.y - this.yGap);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#0abde3";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.slantedSide, this.y - this.yGap);
    ctx.lineTo(this.x - this.slantedSide, this.y - this.yGap + this.side);
    ctx.lineTo(this.x, this.y + this.side);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#0984e3";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.slantedSide, this.y - this.yGap);
    ctx.lineTo(this.x + this.slantedSide, this.y - this.yGap + this.side);
    ctx.lineTo(this.x, this.y + this.side);
    ctx.fill();
  }
  update(ctx, mouse) {
    let dis = Math.sqrt(
      Math.pow(mouse.x - this.x, 2) +
        Math.pow(mouse.y - (this.y - this.yGap), 2)
    );
    if (dis < mouse.range * 2) {
      this.surfaceColor = "#0abde3";
      this.y = this.fixedY + 40;
    }
    this.draw(ctx);
  }
}
