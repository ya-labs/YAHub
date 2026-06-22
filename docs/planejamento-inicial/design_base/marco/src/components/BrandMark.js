window.YAComponents = window.YAComponents || {};

window.YAComponents.BrandMark = function BrandMark({ label = "YA Labs", size = "default" } = {}) {
  const [prefix, suffix = "Labs"] = label.split(" ");

  return `
    <a class="brand-mark brand-mark--${size}" href="#" aria-label="${label}">
      <span class="brand-ya">
        ${prefix}
        <span class="brand-star" aria-hidden="true"></span>
      </span>
      <span class="brand-labs">${suffix}</span>
    </a>
  `;
};
