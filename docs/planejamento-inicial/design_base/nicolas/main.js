const layers = Array.from(document.querySelectorAll("[data-depth]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;
let frameId = 0;

function renderParallax() {
  pointerX += (targetX - pointerX) * 0.06;
  pointerY += (targetY - pointerY) * 0.06;

  layers.forEach((layer) => {
    const depth = Number(layer.dataset.depth ?? 0);
    const x = pointerX * depth * 10;
    const y = pointerY * depth * 7;

    layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  if (Math.abs(targetX - pointerX) > 0.001 || Math.abs(targetY - pointerY) > 0.001) {
    frameId = window.requestAnimationFrame(renderParallax);
  } else {
    frameId = 0;
  }
}

function handlePointerMove(event) {
  if (reducedMotion.matches) {
    return;
  }

  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;

  if (!frameId) {
    frameId = window.requestAnimationFrame(renderParallax);
  }
}

function resetParallax() {
  targetX = 0;
  targetY = 0;

  if (!frameId) {
    frameId = window.requestAnimationFrame(renderParallax);
  }
}

window.addEventListener("pointermove", handlePointerMove, { passive: true });
window.addEventListener("pointerleave", resetParallax);
