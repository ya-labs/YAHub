const heroTabDefinitions = [
  { id: "design-01", label: "Design 01" },
  { id: "design-02", label: "Design 02" },
  { id: "design-03", label: "Design 03" },
];

window.YAComponents = window.YAComponents || {};

window.YAComponents.HeroTabs = function HeroTabs() {
  const { HeroDesignOne, HeroDesignTwo, HeroDesignThree } = window.YAComponents;
  const tabButtons = heroTabDefinitions
    .map(
      (tab) => `
        <button class="design-tab" type="button" role="tab" data-design-tab="${tab.id}">
          ${tab.label}
        </button>
      `,
    )
    .join("");

  return `
    <main class="site-shell">
      <div class="hero-stage" data-hero-stage>
        ${HeroDesignOne()}
        ${HeroDesignTwo()}
        ${HeroDesignThree()}
      </div>

      <div class="design-tabs" role="tablist" aria-label="Alternar design da hero">
        ${tabButtons}
      </div>
    </main>
  `;
};
