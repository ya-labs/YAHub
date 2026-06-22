window.YAComponents = window.YAComponents || {};

window.YAComponents.HeroDesignThree = function HeroDesignThree() {
  const { AsciiBackground, CommandBar, GlowBackground, GridSurface, Navbar, OrbitalLines } =
    window.YAComponents;

  return `
    <section class="hero hero-three" data-design-panel="design-03" aria-label="Design 03">
      ${GlowBackground()}
      ${GridSurface({ variant: "horizon" })}
      ${OrbitalLines({ variant: "sky" })}
      ${Navbar({ brand: "YA Labs", variant: "minimal", showLinks: false })}

      <div class="hero-three__visual parallax-strong" aria-hidden="true">
        ${AsciiBackground({ mode: "binary" })}
        <div class="sky-monument">
          <span class="monument-letter monument-y">Y</span>
          <span class="monument-letter monument-a">A</span>
          <span class="monument-star"></span>
        </div>
        <div class="runway runway-one"></div>
        <div class="runway runway-two"></div>
        <div class="sky-cloud sky-cloud-one"></div>
        <div class="sky-cloud sky-cloud-two"></div>
      </div>

      <div class="hero-three__content hero-content">
        <h1 class="hero-title hero-title--editorial">
          <span>Code.</span>
          <span>Automate.</span>
          <span>Scale.</span>
        </h1>

        <p class="hero-copy">
          Um laboratório para construir, automatizar e evoluir software com propósito.
        </p>

        ${CommandBar({ prompt: "yahub", className: "command-bar--light command-bar--compact" })}
      </div>

      <div class="down-cue" aria-hidden="true">↓</div>
    </section>
  `;
};
