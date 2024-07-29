import { CubeHeight } from "./cubeheight.js";

let mouse = {
  x: undefined,
  y: undefined,
  range: 40,
};

let cube = {
  w: 4,
  h: 4,
};
let i = {
  vertical: 0,
  horizontal: 0,
};

const container = document.querySelector(".container");
const inputW = document.querySelector(".input_w");
const inputH = document.querySelector(".input_h");
const updateBtn = document.querySelector(".btn_update");
const hideBtn = document.querySelector(".btn_hide");

const up = document.querySelector(".btn_up");
const down = document.querySelector(".btn_down");
const right = document.querySelector(".btn_right");
const left = document.querySelector(".btn_left");

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    updateBtn.addEventListener("click", () => {
      cube.w = inputW.value;
      cube.h = inputH.value;
      this.resize();
    });

    hideBtn.addEventListener("click", () => {
      container.style.display = "none";
    });

    up.addEventListener("click", () => {
      i.vertical -= 20;
      this.resize();
    });
    down.addEventListener("click", () => {
      i.vertical += 20;
      this.resize();
    });
    right.addEventListener("click", () => {
      i.horizontal += 20;
      this.resize();
    });
    left.addEventListener("click", () => {
      i.horizontal -= 20;
      this.resize();
    });

    window.requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.cubeHeight = new CubeHeight(
      this.stageWidth / 2 + i.horizontal,
      this.stageHeight / 2 + i.vertical,
      cube.w,
      cube.h
    );
    this.cubeHeight.resize();
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.cubeHeight.draw(this.ctx, mouse);

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(246, 229, 141, 0.7)";
    this.ctx.arc(mouse.x, mouse.y, mouse.range, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

window.onload = () => {
  new App();
};
