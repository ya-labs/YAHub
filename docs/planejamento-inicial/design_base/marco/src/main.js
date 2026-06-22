const app = document.querySelector("#app");

app.innerHTML = window.YAComponents.HeroTabs();

const stage = document.querySelector("[data-hero-stage]");
const designTabButtons = [...document.querySelectorAll("[data-design-tab]")];
const root = document.documentElement;

function setActiveDesign(designId) {
  designTabButtons.forEach((tab) => {
    const isActive = tab.dataset.designTab === designId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  stage.dataset.activeDesign = designId;
  stage.querySelectorAll("[data-design-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.designPanel === designId);
  });
}

designTabButtons.forEach((tab) => {
  tab.addEventListener("click", () => setActiveDesign(tab.dataset.designTab));
});

window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  root.style.setProperty("--spot-x", `${Math.round(x * 100)}%`);
  root.style.setProperty("--spot-y", `${Math.round(y * 100)}%`);
  root.style.setProperty("--parallax-x", `${(x - 0.5) * 28}px`);
  root.style.setProperty("--parallax-y", `${(y - 0.5) * 20}px`);
  root.style.setProperty("--parallax-soft-x", `${(x - 0.5) * 12}px`);
  root.style.setProperty("--parallax-soft-y", `${(y - 0.5) * 8}px`);
  root.style.setProperty("--parallax-soft-neg-x", `${(0.5 - x) * 12}px`);
  root.style.setProperty("--parallax-soft-neg-y", `${(0.5 - y) * 8}px`);
});

setActiveDesign("design-01");
