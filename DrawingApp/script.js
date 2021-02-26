const canvas = document.getElementById("canvas");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const ctx = canvas.getContext("2d");
let sizeEl = document.getElementById("size");
console.log(sizeEl);
let colorEl = document.getElementById("color");
let size = 30;

let color = "black";
let mouseDown = false;
x = 50;
y = 50;

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  mouseDown = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSize() {
  sizeEl.innerText = size;
}

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});
increase.addEventListener("click", () => {
  size += 3;
  if (size > 30) {
    size = 30;
  }
  updateSize();
});

decrease.addEventListener("click", () => {
  size -= 3;
  if (size < 3) {
    size = 3;
  }
  updateSize();
});
