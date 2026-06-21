# Direção visual do YA Hub

## Objetivo

O YA Hub deve ser a principal referência visual institucional da YA LABS.

Enquanto ferramentas operacionais da organização precisam priorizar densidade, produtividade e feedback de ação, o YA Hub deve priorizar primeira impressão, clareza institucional, apresentação de projetos e navegação pelo ecossistema.

## Relação com o design system

O design system oficial fica no YABook:

- [Design system da YA LABS](https://github.com/ya-labs/YABook/blob/main/docs/guias/design-system.md)

O YA Hub deve aplicar a identidade visual da YA LABS e ajudar a validar decisões em uso real.

Quando uma decisão visual do YA Hub se mostrar estável, reutilizável e útil para outros produtos, ela pode ser levada ao YABook como padrão organizacional.

## Papel do portal

O YA Hub deve comunicar:

- quem é a YA LABS;
- o que a organização constrói;
- quais projetos estão ativos;
- quem participa das entregas;
- como acessar produtos, estudos, documentação e links oficiais.

## Conceito de experiência

O YA Hub deve ser útil por estrutura e marcante por experiência.

A página principal deve funcionar como a cara da YA LABS, não como um painel tentando mostrar todos os dados do portal. Ao acessar a Home, a pessoa deve perceber uma organização técnica, moderna, produtiva e confiável, mas também com identidade própria, criatividade e interações memoráveis.

A experiência visual pode ser mais expressiva na Home, desde que a navegação continue clara e as informações principais sejam encontradas sem esforço.

O objetivo não é criar apenas uma landing page bonita, nem um painel informativo compacto. A Home deve ser uma apresentação narrativa da YA LABS, enquanto o YA Hub como portal pode ser explicado em uma seção própria mais adiante.

## Direção final escolhida

A direção final para a Home do YA Hub é uma interface de **laboratório futurista + sistema operacional técnico**.

Essa direção combina com a identidade da YA LABS porque faz o site parecer uma ferramenta própria, um portal técnico e uma central viva da organização, em vez de uma landing page genérica de startup.

Separação conceitual:

```text
YAHub = portal, interface e central de acesso.
YA LABS = organização, laboratório e ecossistema apresentado pelo portal.
```

Frase conceitual:

```text
YAHub é a porta de entrada da YA LABS.
```

Ou:

```text
Tudo que a YA LABS constrói, organiza e documenta começa pelo YAHub.
```

Sensação desejada:

```text
Não parece só um site.
Parece uma ferramenta.
Parece um laboratório técnico.
Parece o sistema operacional da YA LABS.
```

### Linguagem visual

Manter como base:

- muito espaço em branco;
- tipografia grande, forte e limpa;
- comandos de terminal como microdetalhes;
- fonte monoespaçada em pontos estratégicos;
- azul escuro como cor secundária principal;
- status de sistema;
- CTA azul escuro/azul forte;
- dois painéis flutuantes com dados técnicos: `ATIVIDADE DO SISTEMA` e `YA.SYSTEM`;
- nuvens/fumaça sutis no fundo;
- chão de laboratório/grid sutil na parte inferior;
- plataforma circular como base da arte central;
- órbitas visíveis atrás do ASCII;
- cards minimalistas;
- linhas finas;
- sensação de sistema operacional/dev tool;
- aparência de produto técnico, não de landing page comum.

Não manter a barra inferior grande com dados operacionais na hero. A primeira dobra deve respirar; dados como versão, kernel, ambiente, região e conexão podem aparecer em outras áreas do portal, mas não como faixa inferior da hero.

### CTA principal

O CTA principal deve ser:

```text
Acessar o portal →
```

Evitar como CTA principal:

```text
Entrar no laboratório
```

Motivo:

```text
YA LABS = laboratório.
YAHub = portal.
```

O usuário acessa o portal para explorar o laboratório.

## Narrativa da Home

A Home deve contar a história da YA LABS progressivamente, com bastante espaço em branco, seções amplas, animações suaves e foco em uma ideia por vez.

Fluxo conceitual recomendado:

1. Hero — YA LABS.
2. O laboratório / organização.
3. Ecossistema YA.
4. Fluxo de construção.
5. Produtos.
6. Central YAHub.

A primeira dobra deve ser quase fullscreen, com foco total em:

```text
YA LABS
Code. Automate. Scale.
```

Texto base sugerido:

```text
Um laboratório para construir, automatizar
e evoluir software com propósito.
```

Terminal sugerido:

```text
yahub:~$ boot portal
```

CTA:

```text
Acessar o portal →
```

Status:

```text
status: online ●
```

Evitar na primeira dobra:

- cards demais;
- métricas demais;
- listagem de projetos;
- atalhos competindo;
- aparência de dashboard;
- tentativa de explicar todo o ecossistema de uma vez.

## Seções da Home

### 01. Hero — YA LABS

Objetivo: apresentar a YA LABS como o universo principal dentro do portal YAHub.

Conteúdo:

```text
YA LABS
Code. Automate. Scale.

Um laboratório para construir, automatizar
e evoluir software com propósito.
```

Elementos visuais:

- `YAHub` sozinho no topo esquerdo, sem `by YA LABS`;
- navbar central minimalista e numerada, como `01. Início`, `02. Soluções`, `03. Tecnologia`, `04. Sobre` e `05. Contato`, ou equivalentes definidos pela arquitetura final;
- botão `Acessar o portal →` no canto direito;
- microdetalhes de terminal distribuídos pela interface, como `yahub:~$ boot portal`, cursor, comandos curtos e rótulos técnicos;
- título principal `YA LABS`;
- `YA` do título seguindo o símbolo oficial da marca, com o corte correto no `A`;
- subtítulo `Code. Automate. Scale.`;
- grande ASCII `YA` centralizado sobre uma plataforma circular;
- órbitas visíveis atrás do ASCII;
- nuvens/fumaça sutis no fundo;
- chão de laboratório/grid sutil na parte inferior;
- dois painéis flutuantes com dados técnicos: `ATIVIDADE DO SISTEMA` e `YA.SYSTEM`;
- sem barra inferior grande de informações operacionais;
- `status: online` no canto inferior;
- fundo branco/cinza muito claro e muito espaço vazio.

A arte ASCII central deve ser marcante e memorável, não apenas decorativa. Ela pode ser animada na implementação real, como se o sistema estivesse formando o símbolo ou identidade da YA LABS com caracteres monoespaçados, pontos, partículas, linhas orbitais, nós, plataforma circular e pequenos sinais de renderização.

O hero não deve ter um bloco grande de terminal competindo com `YA LABS` ou com o ASCII `YA`. A linguagem terminal deve aparecer como assinatura visual em microdetalhes.

A primeira dobra deve fechar em si mesma. A seção `Construímos como laboratório.` não deve aparecer visível na tela inicial; ela começa apenas depois do scroll.

#### Tema claro

O tema claro deve usar a imagem clara refinada como referência principal.

Direção:

- fundo branco/cinza muito claro, frio, limpo e premium;
- bastante espaço em branco;
- `YA` do título em navy quase preto, forte e pesado;
- `LABS` fino, elegante e espaçado;
- `Scale.` pode receber azul de destaque;
- ASCII `YA` grande, formado por caracteres/dígitos, sem ficar azul demais nem apagado;
- órbitas suaves, finas e visíveis atrás/em volta do ASCII, com pequenos pontos luminosos;
- nuvens/fumaça suaves e névoa leve, presentes sem pesar;
- chão/plano inferior sutil, com grid/reflexos de laboratório;
- plataforma circular clara, prateada, com glow suave;
- terminal/input claro com glassmorphism leve, borda suave e cursor no final;
- painéis `ATIVIDADE DO SISTEMA` e `YA.SYSTEM` em glass claro, com sombra leve e textos legíveis.

Evitar fundo cinza pesado, brilho estourado, ASCII azul saturado, excesso de labels técnicos e aparência de concept art sem cara de site.

#### Tema escuro

O tema escuro deve parecer a mesma hero em versão noturna.

Direção:

- fundo navy profundo, sem preto seco;
- evitar roxo demais, mas permitir azul violeta muito suave no glow e nas bordas;
- `YA` do título branco ou quase branco;
- `LABS` fino, elegante e claro;
- ASCII `YA` maior, holográfico, branco/azul gelo, com brilho controlado;
- órbitas visíveis, finas e elegantes, com pontos luminosos;
- plataforma circular mais presente, com glow azul/branco suave e profundidade;
- fumaça/nuvens escuras discretas;
- terminal/input escuro com glassmorphism, borda azul suave e cursor claro;
- painéis `ATIVIDADE DO SISTEMA` e `YA.SYSTEM` em glass escuro translúcido, bordas azuladas e glow sutil.

Evitar neon agressivo, fundo preto puro, azul saturado demais, brilho estourado, excesso de cards, barra inferior operacional e visual sci-fi poluído.

### 02. O laboratório / organização

Objetivo: explicar a cultura da YA LABS, como pensamos, criamos e evoluímos.

Título preferencial:

```text
Construímos como laboratório.
```

Texto sugerido:

```text
YA LABS é um laboratório independente de software.
Construímos, automatizamos e documentamos soluções para resolver problemas reais com clareza, eficiência e evolução contínua.
```

Blocos conceituais:

- **Desenvolvimento:** código limpo, modular e testável.
- **Automação:** eliminamos o repetitivo para liberar o que realmente importa.
- **Documentação:** registramos o essencial para garantir clareza, uso e evolução.
- **Aprendizado:** compartilhamos conhecimento e incentivamos a prática.

Comandos de apoio:

```text
ya@hub:~$ sobre
ya@hub:~$ áreas
```

Bloco de missão:

```text
nossa missão:
simplificar o complexo.
potencializar pessoas.
```

Essa seção deve seguir a estética terminal/dev tool e evitar parecer institucional genérica.

## Arquitetura conceitual da organização

A Home deve separar claramente a YA LABS, o Ecossistema YA e os produtos da organização.

```text
YA LABS
|-- Ecossistema YA
|   |-- YAHub
|   |-- YABook
|   |-- YAGit
|   `-- YABot
|
`-- Produtos
    |-- CADE-O-DANO
    |-- SVNFlow
    |-- DevLab
    |-- RMAWorker
    |-- Meu Treino
    `-- Spotifolio
```

### Ecossistema YA

O Ecossistema YA reúne ferramentas oficiais usadas para organizar, operar, documentar, automatizar ou visualizar a própria YA LABS.

Ferramentas iniciais:

- **YAHub:** portal central da organização, usado para visualizar projetos, membros, atividades, documentação e status geral.
- **YABook:** documentação, padrões, guias e engenharia da organização.
- **YAGit:** ferramenta para automação e padronização de fluxos Git/GitHub.
- **YABot:** bot do Discord para comunicação, notificações, automações e integrações.

Regra de nome:

```text
Se serve para organizar, operar, documentar ou automatizar a YA LABS, pode usar prefixo YA.
```

Texto principal:

```text
Ecossistema YA

As ferramentas que mantêm a YA LABS em movimento.
```

Terminal:

```text
ya@hub:~$ ecossistema ya

> conectando ecossistema...
> mapeando módulos...
> estruturando relações...
> sincronizando ferramentas...

> pronto!
```

A estrutura visual deve manter a ideia de módulos conectados, com YAHub como portal central e YABook, YAGit e YABot como módulos conectados.

### Fluxo de construção

Essa seção deve mostrar o jeito YA LABS de transformar uma ideia em produto.

Título:

```text
Como uma ideia vira produto.
```

Subtexto:

```text
Um fluxo colaborativo, transparente e iterativo.
Da ideia à entrega, com clareza, qualidade e foco em impacto real.
```

Etapas:

```text
01. Ideia
02. Documentação
03. Issue
04. Branch
05. Pull Request
06. Release
```

Comandos:

```text
yahub:~$ new idea
yahub:~$ docs init
yahub:~$ issue create
yahub:~$ git checkout -b
yahub:~$ pr open
yahub:~$ release create
```

Frases de apoio:

```text
# colaboração distribuída
# qualidade por padrão
# entregas com propósito

status: contínuo
princípio: ship value, not features
métrica: impacto > output
```

Manter a linha horizontal com etapas conectadas.

### Produtos

Produtos são projetos criados pela YA LABS, mas com identidade própria. Eles não precisam usar prefixo `YA`, porque podem existir como produtos independentes dentro do portfólio da organização.

Produtos iniciais:

- **SVNFlow:** ferramenta para padronizar fluxos com SVN, Git e entregas.
- **DevLab:** produto educacional da YA LABS, focado em aprendizado, trilhas, conteúdos, exercícios e evolução técnica.
- **Spotifolio:** plataforma de portfólio musical/profissional.
- **CADE-O-DANO:** projeto divertido e experimental voltado para League of Legends.
- **RMAWorker:** produto/ferramenta voltado para automação e processos.
- **Meu Treino:** app voltado para treinos, academia e acompanhamento pessoal.

Regra de nome:

```text
Se é um produto criado pela YA LABS, mas com identidade própria, não precisa usar prefixo YA.
```

Texto principal:

```text
Produtos que nasceram no laboratório.
```

Texto de apoio:

```text
Softwares com identidade própria, criados na YA LABS para resolver problemas reais com código, automação e escala.
```

Os cards de produto devem funcionar como comandos executáveis dentro do YAHub.

Comandos iniciais:

```text
ys@hub:~$ svnflow --start
ys@hub:~$ devlab --open
ys@hub:~$ spotifolio --sync
ys@hub:~$ cadeodano --scan
```

Visual:

- cards grandes;
- bastante espaço em branco;
- ícones simples;
- cor própria por produto;
- terminal no topo de cada card;
- linha ou borda colorida no rodapé;
- seta discreta de ação.

### Central YAHub

Essa seção representa o próprio YAHub como portal/dashboard central.

Ela conclui a narrativa:

```text
Depois de entender a YA LABS, o ecossistema, o fluxo e os produtos,
o usuário entende onde tudo isso se conecta: no YAHub.
```

Título sugerido:

```text
YAHub: a porta de entrada da YA LABS
```

Subtexto:

```text
YAHub conecta pessoas, projetos e conhecimento.
Centralizamos projetos, membros, documentação e atividade em um só lugar.
```

Itens:

- **Explore projetos:** descubra iniciativas e acompanhe seu progresso.
- **Conecte-se com membros:** colabore com a comunidade e amplie sua rede.
- **Acesse documentação:** encontre guias, referências e boas práticas.
- **Acompanhe a atividade:** veja o que está acontecendo em tempo real.

CTAs:

```text
Acessar o portal
Ver projetos
Acessar documentação
```

Aqui pode aparecer um preview mais parecido com dashboard/portal. O hero não deve ser dashboard; o dashboard deve aparecer apenas aqui, como representação do YAHub.

## Referências visuais iniciais

As referências analisadas indicam uma preferência por interfaces tech modernas, com acabamento premium, bom uso de espaço, contraste forte e composições que misturam produto, marca e interação.

Aprendizados principais:

- **Linear:** principal referência para clareza, foco, seções grandes, ritmo narrativo, hierarquia forte e apresentação progressiva.
- **Vercel:** referência para estética tech minimalista, precisão visual e sensação institucional moderna.
- **Apple:** referência para narrativa no scroll, revelação progressiva e impacto visual por respiro, sem exagerar na complexidade.
- **Raycast:** referência para acabamento premium, tema escuro sofisticado, navegação refinada e microinterações com personalidade.
- **Supabase:** referência para grids modulares, cards de funcionalidades e apresentação objetiva de blocos técnicos.
- **Mintlify:** referência para áreas de documentação, leitura técnica, navegação lateral e organização de conteúdo.
- **Railway:** referência para storytelling de produto, seções amplas e mistura entre apresentação institucional e interface real.
- **ASM e Starlight:** referências de atmosfera, brilho, profundidade e impacto visual, mas não devem ser usadas como base para evitar associação excessiva com web3, cripto ou abstração genérica.

Essas referências não devem ser copiadas literalmente. Elas servem para orientar sensações, qualidade visual e tipos de decisão que combinam com a YA LABS.

## Home e páginas internas

A Home pode ser mais imersiva, visual e interativa, pois será a principal apresentação da organização.

Ela deve transmitir:

- primeira impressão forte;
- identidade própria da YA LABS;
- clareza sobre o que a organização constrói;
- descoberta progressiva do ecossistema;
- sensação de tecnologia, organização e movimento.

A Home não deve compactar projetos, membros, documentação e atividades no hero. Esses conteúdos podem existir, mas devem aparecer em seções separadas, com foco único e bastante respiro visual.

O dashboard pode aparecer como representação do YA Hub em uma seção específica, não como linguagem dominante da Home inteira.

As páginas internas devem ser mais objetivas. Projetos, membros, documentação, atividade recente e futuras áreas operacionais devem priorizar leitura, navegação, filtros, links, status e informações úteis.

Princípio de decisão:

```text
Primeira impressão memorável, uso contínuo objetivo.
```

## Interações e personalidade

As interações devem reforçar a identidade da YA LABS sem esconder conteúdo importante.

Possibilidades para fases futuras:

- microinterações em cards de projetos;
- elementos visuais que respondem ao mouse, foco ou rolagem;
- command palette ou atalhos de navegação;
- pequenos detalhes animados no hero;
- modo especial de exploração do ecossistema;
- experiência visual inspirada em laboratório digital;
- mascote ou assistente digital guiando pontos específicos da interface.

A navegação principal não deve depender dessas interações. A camada interativa deve enriquecer a experiência, não substituir o fluxo normal de acesso à informação.

## Mascote e assistente digital

A ideia de um mascote pode ajudar a YA LABS a não parecer apenas uma organização técnica genérica.

O conceito inicial é um assistente digital amigável, inspirado na ideia de uma presença leve que habita o laboratório, acompanha projetos, aparece em momentos de apoio e ajuda a tornar o ecossistema mais memorável.

O mascote deve parecer:

- amigável;
- inteligente;
- curioso;
- confiável;
- leve;
- técnico o suficiente para não parecer infantil.

Possíveis usos:

- apoio visual na Home;
- empty states;
- onboarding;
- documentação;
- bot ou integrações futuras com Discord;
- modo interativo de exploração do YA Hub.

O mascote não deve ser a identidade inteira da YA LABS. Ele deve funcionar como uma camada de personalidade aplicada com cuidado.

## Diretrizes iniciais

- Usar português do Brasil como idioma padrão.
- Priorizar visual limpo, moderno e profissional.
- Manter alto contraste e boa legibilidade.
- Usar mais respiro visual do que uma ferramenta operacional.
- Evitar aparência de dashboard administrativo na Home pública.
- Usar cards e seções institucionais quando ajudarem a apresentar projetos.
- Evitar excesso de decoração que atrapalhe leitura, navegação ou manutenção.
- Permitir uma experiência mais marcante na Home, desde que ela continue acessível e compreensível.
- Priorizar scroll narrativo, seções grandes e uma ideia por vez na Home.
- Separar claramente YA LABS, Ecossistema YA, Produtos e YA Hub.
- Evitar transformar a primeira dobra em dashboard, portal cheio de cards ou listagem compacta de projetos.
- Usar linguagem de terminal e comandos como parte estrutural da narrativa visual.
- Usar `Acessar o portal →` como CTA principal da Home.
- Tratar interações como parte da identidade, não como enfeites soltos.
- Evitar que o site pareça uma landing page SaaS genérica, especialmente com excesso de roxo, azul, gradientes e cards repetitivos.
- Evitar visual cripto, NFT ou web3 abstrato quando isso não comunicar algo real sobre a YA LABS.

## Cores base

As cores oficiais da marca devem seguir o YABook:

- primária: `#0A1A5E`;
- destaque: `#2563FF`;
- fundo claro: `#FFFFFF`;
- superfície clara: `#F8FAFC`;
- texto principal: `#0F172A`.

O tema claro deve representar o padrão inicial da YA LABS: branco, limpo, organizado e com detalhes em azul escuro, azul forte e azul claro.

O tema escuro também deve ser previsto desde o início como opção completa para todos os sites, aplicativos e ferramentas da YA LABS. Ele não deve ser tratado apenas como decoração, seção especial ou recurso exclusivo da Home.

No YA Hub, o tema escuro pode carregar momentos mais imersivos, premium e marcantes da experiência, principalmente na Home, em áreas de destaque e em futuras experiências exploráveis. Ainda assim, a navegação, as páginas internas, os cards, os formulários e os estados da interface devem funcionar bem em tema claro e escuro.

A identidade da YA LABS não deve depender exclusivamente de dark mode. O sistema visual precisa funcionar bem em tema claro e escuro.

## Diferença entre portal e ferramentas

O YA Hub pode usar composição mais institucional, seções de apresentação e elementos de marca.

Ferramentas como SVNFlow e futuros painéis internos devem adaptar a mesma identidade para uso recorrente, com mais densidade de informação, menos decoração e feedback operacional mais direto.

## Limite da documentação local

Este documento registra a direção visual específica do YA Hub.

Tokens globais, filosofia visual, governança de design e decisões reutilizáveis devem ficar no YABook.
