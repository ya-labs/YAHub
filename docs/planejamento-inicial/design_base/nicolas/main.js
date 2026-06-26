const canvas = document.querySelector(".hero-canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let dpr = 1;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;
let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const nodes = [
  { angle: 0.18, orbit: 0.72, speed: 0.00013, size: 2.2 },
  { angle: 1.72, orbit: 0.58, speed: -0.00011, size: 1.6 },
  { angle: 2.86, orbit: 0.82, speed: 0.00009, size: 1.8 },
  { angle: 4.32, orbit: 0.64, speed: -0.00015, size: 2.4 },
  { angle: 5.1, orbit: 0.48, speed: 0.0001, size: 1.4 },
];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawOrbit(cx, cy, rx, ry, rotation, alpha) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(214, 162, 58, ${alpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function drawNode(cx, cy, rx, ry, rotation, node, time) {
  const angle = node.angle + time * node.speed;
  const x = Math.cos(angle) * rx * node.orbit;
  const y = Math.sin(angle) * ry * node.orbit;
  const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation);
  const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);
  const px = cx + rotatedX;
  const py = cy + rotatedY;
  const glow = ctx.createRadialGradient(px, py, 0, px, py, node.size * 8);

  glow.addColorStop(0, "rgba(214, 162, 58, 0.86)");
  glow.addColorStop(0.38, "rgba(214, 162, 58, 0.18)");
  glow.addColorStop(1, "rgba(214, 162, 58, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, py, node.size * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(214, 162, 58, 0.86)";
  ctx.beginPath();
  ctx.arc(px, py, node.size, 0, Math.PI * 2);
  ctx.fill();
}

function draw(time = 0) {
  pointerX += (targetX - pointerX) * 0.045;
  pointerY += (targetY - pointerY) * 0.045;

  ctx.clearRect(0, 0, width, height);

  const cx = width * 0.78 + pointerX * 18;
  const cy = height * 0.52 + pointerY * 12;
  const base = Math.min(width, height);
  const rotation = -0.45 + pointerX * 0.03;

  const light = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.62);
  light.addColorStop(0, "rgba(92, 115, 181, 0.18)");
  light.addColorStop(0.42, "rgba(39, 53, 96, 0.08)");
  light.addColorStop(1, "rgba(2, 8, 18, 0)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, width, height);

  drawOrbit(cx, cy, base * 0.48, base * 0.16, rotation, 0.22);
  drawOrbit(cx + base * 0.03, cy - base * 0.02, base * 0.56, base * 0.24, rotation + 0.34, 0.13);
  drawOrbit(cx - base * 0.02, cy + base * 0.03, base * 0.42, base * 0.12, rotation - 0.44, 0.18);

  nodes.forEach((node, index) => {
    drawNode(
      cx,
      cy,
      base * (index % 2 === 0 ? 0.56 : 0.48),
      base * (index % 2 === 0 ? 0.24 : 0.16),
      rotation + index * 0.13,
      node,
      reducedMotion ? 0 : time,
    );
  });

  if (!reducedMotion) {
    requestAnimationFrame(draw);
  }
}

function onPointerMove(event) {
  targetX = (event.clientX / width - 0.5) * 2;
  targetY = (event.clientY / height - 0.5) * 2;
}

window.addEventListener("resize", () => {
  resize();
  draw();
});

window.addEventListener("pointermove", onPointerMove, { passive: true });

resize();
draw();
