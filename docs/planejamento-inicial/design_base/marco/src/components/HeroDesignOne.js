window.YAComponents = window.YAComponents || {};

window.YAComponents.HeroDesignOne = function HeroDesignOne() {
  const {
    AsciiBackground,
    BrandMark,
    CommandBar,
    GlowBackground,
    GridSurface,
    Navbar,
    OrbitalLines,
  } = window.YAComponents;

  return `
    <section class="hero hero-one" data-design-panel="design-01" aria-label="Design 01">
      ${GlowBackground()}
      ${GridSurface({ variant: "soft" })}
      ${OrbitalLines({ variant: "wide" })}
      ${Navbar({ brand: "YA Labs", variant: "minimal", showLinks: false })}

      <div class="hero-one__content hero-content">
        <div class="eyebrow-line">
          <span></span>
          <p>Software laboratory</p>
        </div>

        <div class="hero-one__brand-lockup">
          ${BrandMark({ label: "YA Labs", size: "hero" })}
        </div>

        <h1 class="hero-title hero-title--split">
          <span>Code.</span>
          <span>Automate.</span>
          <span>Scale.</span>
        </h1>

        <p class="hero-copy">
          Um laboratório para construir, automatizar e evoluir software com propósito.
        </p>

        ${CommandBar({ prompt: "yalabs", className: "command-bar--light" })}
      </div>

      <div class="hero-one__visual parallax-strong" aria-hidden="true">
        ${AsciiBackground({ mode: "binary" })}
        <div class="glass-card glass-card--back"></div>
        <div class="glass-card glass-card--front">
          <span class="glass-monogram">YA</span>
          <span class="glass-star"></span>
        </div>
        <div class="gold-thread gold-thread-one"></div>
        <div class="gold-thread gold-thread-two"></div>
      </div>
    </section>
  `;
};
