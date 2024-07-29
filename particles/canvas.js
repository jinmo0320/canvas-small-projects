"use strict";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const colorArray = [
  "#aaa69d",
  "#f7f1e3",
  "#706fd3",
  "#2c2c54",
  "#ff793f",
  "#84817a",
  "#b33939",
];

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Ball {
  constructor(w, h, r, vx, vy, range, maxR, minR) {
    this.w = w;
    this.h = h;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.x = Math.random() * (this.w - this.r * 2) + this.r;
    this.y = Math.random() * (this.h - this.r * 2) + this.r;
    this.range = range;
    this.maxR = maxR;
    this.minR = minR;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "#ecf0f1";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

    ctx.stroke();
    ctx.fill();
  }
  update() {
    if (this.x < this.r || this.x > this.w - this.r) {
      this.vx *= -1;
    }
    if (this.y < this.r || this.y > this.h - this.r) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;

    if (
      mouse.x - this.x < this.range &&
      mouse.x - this.x > -this.range &&
      mouse.y - this.y < this.range &&
      mouse.y - this.y > -this.range &&
      this.r < this.maxR
    ) {
      this.r += 2;
    } else if (this.r > this.minR) {
      this.r -= 2;
    }

    this.draw();
  }
}

class Loop {
  constructor() {
    this.ballList = [];
  }
  loop(w, h) {
    for (let i = 0; i < 2000; i++) {
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.ballList.push(
        new Ball(w, h, 50, this.speedX, this.speedY, 70, 60, 2)
      );
      this.ballList[i].update();
    }
  }
}

class App {
  constructor() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    canvas.width = this.stageWidth;
    canvas.height = this.stageHeight;

    this.balls = new Loop();
  }
  animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.balls.loop(canvas.width, canvas.height);
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => new App();
