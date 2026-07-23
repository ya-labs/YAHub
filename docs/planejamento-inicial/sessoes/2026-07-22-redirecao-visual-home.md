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

## Referências principais para a nova hero

As imagens `fase3design2.png` e `fase3design1.png` passam a ser as referências principais da fase de composição. Elas foram geradas a partir da discussão desta sessão e representam melhor a combinação procurada entre elegância, presença de marca e continuidade no scroll.

### `fase3design2.png` — estrutura e elegância

Esta referência concentra a direção estrutural mais forte:

- primeira dobra limpa, escura e focada em `YA LABS`;
- marca, slogan, navegação e CTA com hierarquia clara;
- campo visual à direita como contrapeso da assinatura à esquerda;
- hero que continua depois da viewport, abrindo espaço para um primeiro capítulo narrativo;
- `A` monumental usado como arquitetura visual, com respiro e composição organizada.

Ela é a base recomendada para organizar a abertura e a transição inicial da Home.

### `fase3design1.png` — marca como matéria visual

Esta referência contém o gesto visual de maior impacto da discussão:

- o grande `YA` deixa de ser apenas logo e se torna uma estrutura que revela a matéria visual;
- `LABS` aparece em escala monumental e baixa opacidade como continuação espacial da marca;
- textura e elementos da cena atravessam ou aparecem dentro das formas tipográficas;
- a marca ganha força semelhante a uma camada de composição, e não apenas a um título.

O mockup completo é mais denso e perde parte da hierarquia da outra proposta. Não deve ser copiado integralmente. O grande `YA / LABS`, porém, é uma referência visual prioritária e pode se tornar o momento de transformação do primeiro scroll.

### Síntese a investigar no protótipo

O caminho preferencial é combinar os dois papéis, sem tentar fundir todos os elementos de uma vez:

```text
1ª dobra: estrutura, respiro e clareza de fase3design2.
↓
Primeiro scroll: grande YA como máscara, janela ou arquitetura visual, inspirado em fase3design1.
↓
Transição: LABS monumental e sutil como limiar para o próximo capítulo da Home.
```

Essa síntese ainda é uma hipótese de design. A validação deve ocorrer no Figma, em desktop e mobile, antes de alterar o código ou consolidar a direção em `direcao-visual.md`.

### Preferência atual

No encerramento desta investigação, `fase3design2.png` é a referência-base preferida para a hero. Ela orienta a próxima composição por sua clareza, elegância e continuidade após a viewport. O uso monumental de `YA / LABS` de `fase3design1.png` permanece como possibilidade de refinamento para um momento específico do scroll, sem substituir a estrutura-base.

## Encerramento da investigação da hero

A investigação conceitual da hero está encerrada nesta sessão. Não é necessário gerar novas imagens por prompt para continuar. As duas referências principais, os princípios, os critérios e a síntese acima são suficientes para iniciar a composição visual controlada.

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

## Diagnóstico inicial das seções após a hero

### Problema transversal: consistência sem ritmo

As seções atuais usam repetidamente a mesma fórmula: comando técnico pequeno, título grande à esquerda, texto explicativo à direita e grade de cards abaixo. Ela mantém consistência superficial, mas não responde ao papel de cada capítulo da narrativa. O resultado é uma Home em que o leitor repete o mesmo movimento visual — ler o título, procurar explicação à direita e descer para cards — sem ser guiado por uma progressão.

A harmonia desejada não é tornar todas as seções semelhantes. É fazer cada uma herdar a mesma gramática da Home e, ao mesmo tempo, cumprir uma função visual e informacional distinta.

### 01. Sobre a YA LABS — entendimento direto

**Estado atual:** `Construímos como laboratório.` funciona como ponto de partida, mas a seção distribui mensagens concorrentes: título, texto institucional à direita, missão em outro card grande e quatro princípios em cards menores. O texto de missão repete a intenção do conteúdo já apresentado e aumenta a sensação de slogans em vez de explicar a organização.

**Direção a investigar:** uma apresentação curta, sincera e objetiva de quem é a YA LABS. A pessoa deve concluir rapidamente “entendi o que é esta organização e como ela trabalha”. O título pode permanecer, desde que seja acompanhado por uma explicação única e enxuta. Princípios só devem continuar se virarem suporte da experiência — não outro bloco de texto competindo por protagonismo.

**Papel narrativo:** depois da presença da hero, dar significado à marca sem sobrecarregar a leitura.

### 02. Ecossistema YA — descoberta guiada

**Estado atual:** os projetos aparecem como nós distribuídos em um diagrama estático. O leitor precisa alternar entre título, texto, cards à esquerda e direita, terminal e ligações decorativas. YAHub recebe mais destaque, mas YABook, YAGit e YABot não têm uma apresentação equivalente nem uma sequência de descoberta clara.

**Direção a investigar:** tratar o Ecossistema YA como uma experiência de exploração guiada. Uma navegação explícita — abas, trilho lateral ou controles horizontais — pode revelar uma ferramenta por vez, com contexto, função e caminho para conhecê-la no YAHub. Não deve ser um carrossel automático; a pessoa precisa controlar a mudança e poder navegar por teclado.

**Papel narrativo:** mostrar que a YA LABS não é uma marca abstrata; ela se sustenta em ferramentas que organizam, documentam, automatizam e conectam o trabalho.

### 03. Fluxo de construção — sequência legível

**Estado atual:** a sequência `Ideia → Documentação → Issue → Branch → Pull Request → Release` está correta e representa o modo de trabalho real da YA LABS. Porém, sua divisão em cards reduz a percepção de continuidade e a ordem perde força visual quando os estágios ocupam linhas separadas.

**Direção a investigar:** transformar o fluxo em uma trajetória contínua, com cada etapa revelada ou percorrida em ordem. A direção visual precisa comunicar passagem, transformação e rastreabilidade, sem recorrer a um painel de cards. A interação pode enriquecer a leitura, mas a sequência completa deve continuar clara sem depender dela.

**Papel narrativo:** provar que a organização transforma intenção em entrega de maneira visível e disciplinada.

### 04. Produtos — portfólio com identidades próprias

**Estado atual:** a presença de cor por produto é uma boa decisão e comunica diversidade. Ainda assim, seis cards aparecem simultaneamente, dividindo a atenção e fazendo produtos muito distintos parecerem itens de uma mesma grade.

**Direção a investigar:** apresentar cada produto com espaço e identidade próprios. A mecânica pode dialogar com a exploração do Ecossistema YA, mas a linguagem não deve ser idêntica: ecossistema representa ferramentas conectadas da organização; produtos representam criações diversas que nasceram dela. Uma galeria, trilho ou apresentação por produto pode dar foco a cada identidade, com navegação clara para a página correspondente no YAHub.

**Papel narrativo:** demonstrar a variedade concreta de produtos que a YA LABS constrói, sem diluir a personalidade de cada um.

### 05. YAHub — síntese e chamada para ação

**Estado atual:** a composição de texto à esquerda e preview do portal à direita é a mais clara das seções atuais. Ela já estabelece que o YAHub é o lugar onde o ecossistema se encontra, mas o preview ainda é discreto demais para o encerramento da narrativa.

**Direção a investigar:** manter o YAHub como desfecho, ampliando o sentido de central de acesso. O preview deve parecer uma janela real e mais impactante para o portal: projetos, pessoas, documentação e atividade convergem nele. A CTA precisa ser a consequência natural de toda a narrativa, não apenas mais um botão.

**Papel narrativo:** concluir que, depois de conhecer organização, ferramentas, processo e produtos, a pessoa sabe onde explorar tudo: no YAHub.

## Ritmo narrativo provisório da Home

```text
Hero            → presença e curiosidade
Sobre           → entendimento direto
Ecossistema YA  → descoberta guiada
Fluxo           → processo e rastreabilidade
Produtos        → diversidade e resultado concreto
YAHub           → síntese e acesso
```

O objetivo é que a linguagem compartilhada — navy profundo, contraste controlado, marca, movimento e matéria visual — acompanhe todos os capítulos sem obrigar cada um a repetir a mesma grade, a mesma posição de texto ou os mesmos cards.

## Impacto esperado

A Home deve deixar de parecer uma sequência de blocos visualmente bons, porém independentes. O objetivo é uma experiência institucional coesa, criativa e clara, em que a YA LABS seja percebida como uma organização técnica viva, confiável e memorável.
