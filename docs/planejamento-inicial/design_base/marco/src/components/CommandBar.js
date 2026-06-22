window.YAComponents = window.YAComponents || {};

window.YAComponents.CommandBar = function CommandBar({ prompt = "yalabs", className = "" } = {}) {
  return `
    <div class="command-bar ${className}" aria-label="${prompt}: build the future">
      <span class="command-prompt">${prompt}:~$</span>
      <span class="command-text">build the future</span>
      <span class="command-dot" aria-hidden="true"></span>
    </div>
  `;
};
