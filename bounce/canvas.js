const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("button");
canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

let count = 1;
btn.addEventListener("click", function () {
  if (count % 2 === 0) {
    btn.style.color = "#05147d";
  } else {
    btn.style.color = "#0C46F2";
  }
  count += 1;
  init();
});

//////////////////////////////////////////////////////////////

const colors = ["#052AFA", "#045FDE", "#11ADF5", "#05FAC1"];
const gravity = 2;
const friction = 0.95;

function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy *= -friction;
    } else {
      this.dy += gravity;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let balls;
function init() {
  balls = [];
  for (let i = 0; i < 100; i++) {
    let radius = randomInt(8, 50);
    let x = randomInt(radius, canvas.width - radius);
    let y = randomInt(0, canvas.height - radius);
    let dx = randomInt(-10, 10);
    let dy = randomInt(1, 50);
    let color = randomColor(colors);
    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}

init();
animate();
