const navItems = ["Soluções", "Tecnologia", "Sobre", "Recursos", "Comunidade", "Contato"];

window.YAComponents = window.YAComponents || {};

window.YAComponents.Navbar = function Navbar({ brand = "YA Labs", variant = "clean", showLinks = true } = {}) {
  const links = navItems
    .map((item) => `<a class="nav-link" href="#">${item}</a>`)
    .join("");

  return `
    <header class="navbar navbar--${variant}">
      ${window.YAComponents.BrandMark({ label: brand, size: variant === "minimal" ? "small" : "default" })}
      ${
        showLinks
          ? `<nav class="nav-links" aria-label="Navegação principal">${links}</nav>`
          : `<span class="nav-spacer" aria-hidden="true"></span>`
      }
      <a class="portal-button" href="#">
        <span>Ir para o portal</span>
        <span class="portal-arrow" aria-hidden="true">→</span>
      </a>
    </header>
  `;
};
