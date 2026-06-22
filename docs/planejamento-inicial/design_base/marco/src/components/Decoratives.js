const asciiYa = `
YYYYYYY       AAAAA
  YYY        AAAAAAA
  YYY       AAA   AAA
  YYY      AAAAAAAAAAA
  YYY     AAA       AAA
  YYY    AAA         AAA
`;

const binaryField = `
01100101 01011001 01000001 00101101
10010010 00110100 01001000 01000011
01011001 01000001 01101000 01110101
01100010 00111110 01100010 01110101
01101001 01101100 01100100 00100000
01110100 01101000 01100101 00100000
01100110 01110101 01110100 01110101
01110010 01100101 00101110 00101110
`;

window.YAComponents = window.YAComponents || {};

window.YAComponents.GlowBackground = function GlowBackground() {
  return `
    <div class="mouse-glow" aria-hidden="true"></div>
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>
  `;
};

window.YAComponents.OrbitalLines = function OrbitalLines({ variant = "default" } = {}) {
  return `
    <div class="orbits orbits--${variant}" aria-hidden="true">
      <span class="orbit orbit-one"></span>
      <span class="orbit orbit-two"></span>
      <span class="orbit orbit-three"></span>
      <i class="node node-one"></i>
      <i class="node node-two"></i>
      <i class="node node-three"></i>
      <i class="node node-four"></i>
    </div>
  `;
};

window.YAComponents.AsciiBackground = function AsciiBackground({ mode = "ya" } = {}) {
  const content = mode === "binary" ? binaryField : asciiYa;

  return `
    <pre class="ascii ascii--${mode}" aria-hidden="true">${content}</pre>
  `;
};

window.YAComponents.GridSurface = function GridSurface({ variant = "soft" } = {}) {
  return `<div class="grid-surface grid-surface--${variant}" aria-hidden="true"></div>`;
};
