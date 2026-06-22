# Assets da hero YA Hub

Assets extraídos e recriados a partir do protótipo em `docs/planejamento-inicial/design_base/marco`.

Os arquivos foram separados para permitir montagem fiel da hero no front-end sem duplicar elementos. Os fundos base não incluem logo, estrela, ASCII, símbolo principal, órbitas, nuvens ou barras de comando.

## Lista dos assets detectados

- `logo-yalabs.svg`: wordmark principal fiel ao mockup, com texto `YA Labs` e estrela integrada.
- `logo-yahub.svg`: variação do wordmark para uso direto no produto `YA Hub`.
- `hero-background-design-01.svg`: fundo base do Design 01 com gradiente claro, glow ambiente, grid suave e haze inferior.
- `hero-background-design-02.svg`: fundo base do Design 02 com gradiente claro, glow dourado e grid blueprint sutil.
- `hero-background-design-03.svg`: fundo base do Design 03 com atmosfera editorial clara, azul suave e grid de horizonte.
- `glass-ya-card.svg`: elemento principal direito do Design 01 com cards de vidro e monograma YA, sem estrela.
- `construction-ya-symbol.svg`: elemento principal direito do Design 02 com YA, blueprint, andaimes e plataforma, sem estrela.
- `monument-ya-symbol.svg`: elemento principal direito do Design 03 com letras monumentais YA, sem estrela.
- `star-glow.svg`: estrela/acento principal em dourado com glow sutil.
- `star-small.svg`: variação menor da estrela para logo, detalhes ou pontos de destaque.
- `ascii-ya.svg`: marca d'água tipográfica YA em ASCII, transparente.
- `ascii-binary.svg`: campo binário decorativo, transparente.
- `orbits-overlay.svg`: linhas orbitais com nós luminosos, transparente.
- `clouds-design-02.svg`: nuvens e montanhas inferiores do Design 02.
- `clouds-design-03.svg`: nuvens editoriais do Design 03.
- `gold-threads.svg`: linhas douradas finas usadas sobre o card de vidro.
- `runway-lines.svg`: linhas diagonais claras/douradas usadas atrás do monumento YA.
- `command-bar-light.svg`: command bar clara como asset visual.
- `command-bar-dark.svg`: command bar escura como asset visual.

## Ordem de camadas recomendada

1. Background base: `hero-background-design-01.svg`, `hero-background-design-02.svg` ou `hero-background-design-03.svg`.
2. Glow/estrutura de fundo complementar: manter no próprio background ou em CSS com radial gradients.
3. ASCII decorativo: `ascii-binary.svg` ou `ascii-ya.svg`, com baixa opacidade.
4. Grid/orbitais: `orbits-overlay.svg`.
5. Camadas ambientais específicas: `clouds-design-02.svg`, `clouds-design-03.svg`, `gold-threads.svg` ou `runway-lines.svg`.
6. Símbolo principal: `glass-ya-card.svg`, `construction-ya-symbol.svg` ou `monument-ya-symbol.svg`.
7. Estrela/acento: `star-glow.svg` ou `star-small.svg`, posicionada sobre o símbolo principal quando necessário.
8. Conteúdo textual da hero.
9. Command bar: preferencialmente em HTML/CSS se o texto for dinâmico; usar SVG se for estático.
10. Navbar e CTA.

## Sugestão de montagem por design

### Design 01

- Fundo: `hero-background-design-01.svg`.
- Overlay decorativo: `orbits-overlay.svg` em tela cheia, com opacidade entre `0.7` e `1`.
- Visual direito: `glass-ya-card.svg`.
- Detalhes do visual: `ascii-binary.svg`, `gold-threads.svg` e `star-glow.svg`.
- Barra: `command-bar-light.svg` ou componente HTML/CSS claro.

### Design 02

- Fundo: `hero-background-design-02.svg`.
- Overlay decorativo: `orbits-overlay.svg` em tela cheia.
- Visual direito: `construction-ya-symbol.svg`.
- Detalhes do visual: `ascii-ya.svg`, `clouds-design-02.svg` e `star-glow.svg`.
- Barra: `command-bar-dark.svg` ou componente HTML/CSS escuro.

### Design 03

- Fundo: `hero-background-design-03.svg`.
- Overlay decorativo: `orbits-overlay.svg` em tela cheia.
- Visual direito: `monument-ya-symbol.svg`.
- Detalhes do visual: `ascii-binary.svg`, `runway-lines.svg`, `clouds-design-03.svg` e `star-glow.svg`.
- Barra: `command-bar-light.svg` ou componente HTML/CSS claro compacto.

## Command bar em HTML/CSS

Use SVG quando a barra for puramente decorativa. Use HTML/CSS quando `prompt`, texto ou estado precisarem mudar.

```html
<div class="ya-command ya-command--light" aria-label="yalabs: build the future">
  <span class="ya-command__prompt">yalabs:~$</span>
  <span class="ya-command__text">build the future</span>
  <span class="ya-command__dot" aria-hidden="true"></span>
</div>
```

```css
.ya-command {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 292px;
  padding: 14px 18px;
  font-family: "Space Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.88rem;
  line-height: 1;
  box-shadow: 0 16px 32px rgba(6, 26, 60, 0.12);
}

.ya-command--light {
  border: 1px solid rgba(6, 26, 60, 0.08);
  border-radius: 12px;
  color: #061a3c;
  background: rgba(255, 250, 244, 0.82);
  backdrop-filter: blur(20px);
}

.ya-command--dark {
  border: 1px solid rgba(226, 180, 94, 0.42);
  color: #dbe8ff;
  background: linear-gradient(135deg, #061735, #081f46);
  box-shadow: 0 24px 58px rgba(6, 26, 60, 0.28);
}

.ya-command__prompt {
  color: #bd8a35;
  font-weight: 700;
}

.ya-command__dot {
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #bd8a35;
  box-shadow: 0 0 18px rgba(226, 180, 94, 0.9);
}
```

## Observações de implementação

- Todos os arquivos são SVG e podem ser usados como `<img>`, `background-image` ou inline SVG.
- Para manter fidelidade, use `position: absolute` nas camadas decorativas e preserve baixa opacidade em ASCII, órbitas e grids.
- Se precisar exportar PNG/WebP, renderize os SVGs no tamanho final da seção. Para background, use no mínimo `1920x1080`.
- As fontes esperadas são `Inter`, `Playfair Display` e `Space Mono`. Caso o site ainda não carregue essas fontes, o navegador usará fallbacks e o desenho tipográfico pode mudar.
