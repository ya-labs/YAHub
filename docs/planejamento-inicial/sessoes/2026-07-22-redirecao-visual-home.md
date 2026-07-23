# Redireção visual da Home

> Status: documento de trabalho. Esta sessão concentra a discussão e as decisões em evolução sobre o redesign visual da Home. A atualização consolidada só deve ocorrer em `direcao-visual.md` após a nova direção ser aprovada.

## Contexto

Foi iniciada uma revisão da Home para corrigir a falta de harmonia percebida entre hero, elementos visuais e seções. A composição atual comunica a marca e mantém uma base dark premium coerente, mas a experiência ainda não alcança a presença autoral, fluida e sofisticada esperada para o portal institucional da YA LABS.

O objetivo da revisão não é apenas tornar a primeira dobra mais bonita. É construir uma Home em que hero, scroll, capítulos narrativos, composição, tipografia, cor e interação pareçam pertencer ao mesmo universo visual.

## Diagnóstico da hero atual

### O que já comunica bem

- O azul-marinho muito escuro é atraente, sóbrio e adequado para uma presença institucional premium.
- O logo `YA LABS` tem escala e protagonismo suficientes para tornar a marca reconhecível logo na abertura.
- O slogan `Code. Automate. Scale.`, a navegação em minúsculas, o CTA e o indicador de scroll apontam para uma linguagem técnica, discreta e elegante.
- A intenção de usar textura, profundidade e tecnologia como atmosfera é compatível com a YA LABS.

### O que perde harmonia

- A montanha/textura da direita parece aplicada como fundo, sem uma função clara dentro da cena.
- Órbitas, grid, partículas e estrelas parecem camadas independentes, em vez de manifestações da mesma matéria visual.
- Linhas orbitais simples podem ser lidas como rabiscos quando não têm relação espacial com a textura.
- Estrelas e pontos dourados têm presença decorativa maior que seu significado e podem parecer ícones padrão.
- A área vazia entre marca e composição não gera tensão suficiente porque a cena à direita não sustenta o contrapeso.
- Navbar, CTA e scroll possuem boa base tipográfica, mas ainda não têm estados ou respostas que reforcem uma experiência viva e atual.

### Comparação com o mockup anterior

O mockup anterior organiza melhor o lado direito: a montanha tem território próprio, o campo orbital ocupa uma região definida e algumas linhas parecem cruzar ou desaparecer na matéria. Isso gera mais profundidade e dá função espacial para cada camada.

Ainda assim, o mockup é uma composição estática e prototípica. Ele não resolve acabamento, fluidez, comportamento, transições, resposta a interação nem a harmonia com o restante da Home. Deve ser tratado como referência de composição, não como solução a copiar.

## Decisões confirmadas

- A hero continua escura, minimalista, premium e centrada na YA LABS como organização.
- Fundo azul-marinho profundo, marca `YA LABS`, slogan `Code. Automate. Scale.`, CTA `acessar portal` e navegação discreta permanecem como fundamentos.
- Montanha, órbitas, grid e partículas deixam de ser requisitos. Podem ser reaproveitados apenas se integrarem uma linguagem visual única e funcional.
- A hero deve ser tratada como o primeiro capítulo da Home, não apenas como uma imagem de abertura isolada.
- A primeira dobra continua limpa e focada em presença de marca. A composição pode evoluir no scroll antes de começar a próxima seção narrativa.
- Movimento deve criar sensação de matéria viva, profundidade ou transformação; não pode ser efeito decorativo nem prejudicar leitura, desempenho ou redução de movimento.
- A nova direção precisa ser validada em design antes de uma nova rodada de implementação em código.

## Não decidido ainda

- Qual é a matéria visual autoral da YA LABS.
- Se a hero usará vídeo, composição generativa, imagem/material, forma tridimensional, símbolo em transformação ou outra solução.
- Se montanha, órbitas, grid e partículas serão removidos, reinterpretados ou preservados em nova linguagem.
- Qual é o ritmo, amplitude e tecnologia da animação.
- Como a composição muda da primeira dobra para o restante do primeiro capítulo.
- Como a gramática da hero será adaptada para desktop e mobile.

## Princípios de direção

1. **Uma regra visual comum:** formas, textura, tipografia, cor e movimento devem parecer consequências do mesmo sistema.
2. **Marca como composição:** o símbolo `YA` ou a assinatura `YA LABS` pode participar pontualmente da cena, além de funcionar como identificação.
3. **Contraste e hierarquia:** sofisticação deve vir de escala, espaço negativo, tipografia e cores controladas — não de acúmulo de efeitos.
4. **Narrativa contínua:** uma seção deve herdar, transformar ou responder a elementos da anterior.
5. **Clareza institucional:** a experimentação visual não pode transformar a YA LABS em uma marca críptica, genérica de IA/Web3 ou em uma landing page de SaaS.
6. **Hero como capítulo:** a hero pode ultrapassar a primeira dobra e evoluir no scroll, mas a abertura deve manter foco total em presença de marca.
7. **Acessibilidade e desempenho:** qualquer movimento precisa manter contraste, leitura, `prefers-reduced-motion` e desempenho como requisitos de implementação.

## Leitura das referências

| Referência | Aprendizado aplicado ao YAHub |
| --- | --- |
| Raycast | Movimento pode ser uma matéria única, mantendo conteúdo estável e legível. |
| Cleanmeter | A hero pode continuar no scroll como uma composição própria. |
| Railway | Uma metáfora visual consistente pode conectar hero e seções sem cortes bruscos. |
| Collider | A marca pode ocupar a composição como uma camada espacial de alto impacto. |
| Ciridae | Presença de marca, atmosfera escura e transformação no scroll podem coexistir com minimalismo. |
| Anthropic | Tipografia, contraste e espaço negativo podem sustentar elegância sem depender de efeitos. |

### Raycast — matéria viva

O vídeo em movimento ocupa o lugar de todos os efeitos soltos. A energia visual é alta, mas o título, a descrição e os CTAs permanecem estáveis e legíveis. A lição aplicável não é usar vermelho nem repetir o ritmo agressivo: é fazer o movimento parecer uma matéria única e controlada.

### Cleanmeter — hero como ambiente

As grandes formas fluidas não são apenas fundo; elas organizam a hero e continuam enquanto o produto é revelado ao scroll. A referência mostra que uma hero pode ter composição própria e funcionar como capítulo antes de a narrativa principal avançar. A estrutura de cards e o foco em produto não devem ser copiados para a YA LABS.

### Railway — mundo visual e narrativa

A paisagem, a interface de produto, a prova social e a sequência seguinte fazem parte de uma mesma metáfora. O valor da referência está na continuidade: o scroll não corta uma hero e inicia blocos sem relação. A YA LABS precisa encontrar sua própria metáfora, e não usar a linguagem de viagem ou infraestrutura do Railway.

### Collider — marca como camada espacial

O nome da marca ocupa um lugar estrutural na composição, atravessado pelo vídeo e pelo produto central. Mesmo em uma cena densa, há hierarquia clara. Para a YA LABS, a lição é permitir que `YA` ou `YA LABS` participe pontualmente da composição, sem copiar o tom de merch, a paleta quente ou a densidade comercial do site.

### Ciridae — minimalismo com presença

Atmosfera escura, vídeo desfocado, símbolo central e poucas frases criam uma hero marcante sem excesso de informação. No scroll, a identidade se transforma e ganha camadas. Essa é uma referência próxima da postura desejada para a YA LABS: marca em primeiro plano, profundidade controlada e movimento atmosférico. A YA LABS, porém, deve evitar o tom críptico e a associação com estética genérica de IA/Web3.

### Anthropic — elegância por hierarquia

Com cores fixas, espaço negativo e tipografia muito bem posicionada, a Anthropic cria impacto sem depender de fundo animado. A mudança de um bloco claro e editorial para um painel escuro imersivo mostra como uma hero pode ser formada por estados visuais diferentes. A lição é usar contraste, escala e transições deliberadas; não copiar literalmente seu par tipográfico nem sua linguagem editorial.

## Síntese provisória

A nova Home deve combinar três ambições sem tentar reproduzir uma referência inteira:

1. **Presença de marca:** a abertura precisa fazer o visitante querer descobrir a YA LABS.
2. **Elegância controlada:** navy profundo, contraste alto, espaço negativo e tipografia devem sustentar a maior parte do impacto.
3. **Experiência viva e contínua:** a matéria visual e o scroll precisam criar transformação real, não efeitos decorativos sobre seções isoladas.

O resultado desejado é uma experiência institucional criativa e tecnológica, mas clara. A sensação deve ser de uma organização que constrói, conecta e transforma ideias em produtos — não de uma marca de IA abstrata, uma landing page SaaS ou um dashboard público.

## Critérios para a próxima proposta de design

Uma proposta de hero só estará pronta para validação se responder, com composição desktop e mobile, a todos os pontos abaixo:

- A marca continua sendo percebida em menos de alguns segundos, sem precisar de explicação longa.
- Há uma matéria visual protagonista; os elementos secundários parecem nascer dela.
- O contraste mantém logo, slogan, navegação e CTA legíveis.
- O movimento adiciona profundidade, resposta ou transformação e tem alternativa reduzida.
- A cena continua interessante após o primeiro scroll e oferece uma transição intencional para o próximo capítulo.
- A solução não depende de card, métrica, terminal, dashboard ou acúmulo de UI na abertura.
- A estética continua própria da YA LABS e não copia uma referência literalmente.

## Próximos tópicos de trabalho

- Definir a matéria visual autoral da YA LABS.
- Definir a transição entre a abertura da marca e a primeira seção narrativa.
- Analisar a primeira seção após a hero e como ela deve herdar a gramática visual.
- Desenhar e validar a composição desktop e mobile no Figma antes do código.
- Consolidar no `direcao-visual.md` somente as decisões que sobreviverem à validação.

## Impacto esperado

A Home deve deixar de parecer uma sequência de blocos visualmente bons, porém independentes. O objetivo é uma experiência institucional coesa, criativa e clara, em que a YA LABS seja percebida como uma organização técnica viva, confiável e memorável.
