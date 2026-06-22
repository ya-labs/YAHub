window.YAComponents = window.YAComponents || {};

window.YAComponents.HeroDesignTwo = function HeroDesignTwo() {
  const { AsciiBackground, CommandBar, GlowBackground, GridSurface, Navbar, OrbitalLines } =
    window.YAComponents;

  return `
    <section class="hero hero-two" data-design-panel="design-02" aria-label="Design 02">
      ${GlowBackground()}
      ${GridSurface({ variant: "blueprint" })}
      ${OrbitalLines({ variant: "construction" })}
      ${Navbar({ brand: "YA Labs", variant: "clean", showLinks: true })}

      <div class="hero-two__content hero-content">
        <div class="mega-brand" aria-label="YA Labs">
          <span class="mega-ya">
            YA
            <i class="mega-star"></i>
          </span>
          <span class="mega-labs">Labs</span>
        </div>

        <h1 class="hero-title">
          <span>Code.</span>
          <span>Automate.</span>
          <span>Scale.</span>
        </h1>

        <p class="hero-copy hero-copy--wide">
          Um laboratório para construir, automatizar e evoluir software com propósito.
        </p>

        ${CommandBar({ prompt: "yahub", className: "command-bar--dark" })}
      </div>

      <div class="hero-two__visual parallax-strong" aria-hidden="true">
        ${AsciiBackground({ mode: "ya" })}
        <div class="construction-frame">
          <div class="blueprint-grid"></div>
          <div class="scaffold scaffold-left"></div>
          <div class="scaffold scaffold-right"></div>
          <div class="built-ya">
            <span>YA</span>
            <i></i>
          </div>
          <div class="platform"></div>
        </div>
        <div class="mountain mountain-one"></div>
        <div class="mountain mountain-two"></div>
        <div class="cloud cloud-one"></div>
        <div class="cloud cloud-two"></div>
      </div>
    </section>
  `;
};
