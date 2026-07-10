# Roadmap inicial do YAHub

## Visão geral

O roadmap do YAHub deve organizar a evolução do produto em versões incrementais. Cada versão precisa entregar valor próprio e preparar a próxima sem transformar a primeira entrega em uma plataforma grande demais.

## V1 - Portal público e admin básico

Objetivo: colocar o YAHub no ar como portal oficial da YA LABS, com Home institucional, portal navegável, back-end próprio e painel administrativo básico para manter projetos e membros.

Entregas previstas:

- front-end em React e TypeScript;
- back-end inicial do YAHub;
- integração do back-end com a GitHub API;
- Home institucional da YA LABS;
- dashboard inicial do portal;
- listagem de projetos;
- página completa de detalhe de projeto;
- separação de projetos entre Produtos e Ecossistema;
- listagem de membros;
- atividade recente real via GitHub;
- exibição básica do Spotifolio como projeto da YA LABS;
- contratos de API limpos para o front-end;
- painel administrativo na mesma aplicação;
- autenticação administrativa com login e cadastro;
- cadastro administrativo de projetos;
- descoberta de repositórios públicos da organização no Admin;
- cadastro de projetos orientados por URL pública do GitHub;
- exibição separada de projetos oficiais e orientados;
- cadastro administrativo de membros;
- metadados oficiais de projetos e membros no banco de dados;
- links para documentação dos projetos no GitHub;
- preparação futura para ação `Abrir com o YABook`;
- direção visual inicial alinhada ao design system da YA LABS.

Fora da V1:

- documentação interna dos projetos dentro do YAHub;
- upload de imagens;
- escrita automática em repositórios;
- criação automática de Pull Requests;
- permissões administrativas granulares;
- editor rico ou CMS completo;
- cadastro público aberto de administradores sem controle;
- integração real com Spotifolio;
- bot ou automações no Discord;
- `.yahub/project.json` como fonte oficial de metadados;
- projetos sem repositório público no GitHub.

Critério de direção visual: a V1 deve validar a linguagem institucional do YAHub sem tentar consolidar todo o design system da organização dentro deste repositório.

## V2 - Portal público mais rico

Objetivo: enriquecer a apresentação pública dos projetos e membros usando os dados mantidos no admin e complementos técnicos do GitHub.

Entregas previstas:

- showcase com imagens;
- links de site/deploy e repositório;
- tecnologias;
- equipe;
- notas de atualização;
- status e informações ricas de produto.

Fora da V2:

- upload pelo YAHub;
- criação automática de Pull Request;
- documentação interna completa dos projetos.

## V3 - Integração com Spotifolio

Objetivo: conectar o portfólio institucional da YA LABS com os portfólios pessoais do Spotifolio.

Entregas previstas:

- vínculo entre membros do YAHub e perfis do Spotifolio;
- links automáticos para perfis;
- projetos da YA LABS vinculados aos perfis dos membros;
- possível badge de membro oficial da YA LABS;
- possível consumo de dados públicos do Spotifolio pelo YAHub;
- possível consumo de dados do YAHub pelo Spotifolio.

Fora da V3:

- transformar o Spotifolio em seção interna do YAHub;
- obrigar todo usuário do Spotifolio a ser membro da YA LABS;
- tornar o YAHub dependente do Spotifolio para funcionar.

## V4 - Discord e automações

Objetivo: transformar o Discord em um canal vivo de comunicação da organização.

Entregas previstas:

- webhooks;
- notificações de releases, Pull Requests, issues e commits relevantes;
- changelog automático;
- comandos básicos;
- possível bot próprio da YA LABS;
- integração com dados do back-end do YAHub.

Fora da V4:

- substituir o YAHub como fonte pública de informação;
- misturar regras de produto do Spotifolio;
- publicar automações críticas sem revisão.

## Roadmap visual e de experiência

Esta trilha orienta a evolução visual do YAHub em paralelo ao roadmap funcional. Ela deve ajudar a validar a identidade da YA LABS em uso real antes de extrair padrões reutilizáveis para o YABook.

### V1 - Identidade aplicada e Home marcante

Objetivo: aplicar uma primeira versão da identidade visual da YA LABS no portal público, com uma Home narrativa, memorável e objetiva.

Entregas previstas:

- Hero quase fullscreen apresentando a YA LABS, não o dashboard do YAHub;
- Home institucional com primeira impressão forte, scroll narrativo e direção escura, premium, minimalista e autoral;
- seções amplas com uma ideia por vez;
- hero com `YA LABS` como protagonista, `YA` seguindo o símbolo oficial da marca, estrela dourada no `A`, `LABS` espaçado, slogan `Code. Automate. Scale.` e `Scale.` em dourado;
- navbar minimalista, centralizada, com itens minúsculos como `home`, `about`, `ecosystem` e `products`;
- CTA discreto `acessar portal`, com borda dourada fina;
- fundo azul-marinho muito escuro, quase preto, com textura material/rochosa sutil no lado direito;
- grid quase invisível, linhas orbitais discretas, pequenos pontos dourados e indicação `scroll`;
- ausência de descrição longa, terminal, command bar, ASCII protagonista, painéis flutuantes e barra inferior operacional na hero;
- seção "Construímos como laboratório" começando após a primeira dobra, sem aparecer como prévia no hero;
- seção "Ecossistema YA", separando YAHub, YABook, YAGit e YABot;
- seção "Como uma ideia vira produto", conectando ideia, documentação, issue, branch, Pull Request e release;
- seção "Produtos", separando SVNFlow, DevLab, Spotifolio, CADE-O-DANO, RMAWorker e Meu Treino;
- seção "Central YAHub", apresentando o YAHub como portal oficial do ecossistema;
- navegação clara para projetos, membros, documentação, atividades e links oficiais;
- tema claro como padrão institucional, com branco, azul escuro, azul forte e azul claro;
- tema escuro como opção completa para sites, aplicativos e ferramentas da YA LABS;
- uso do tema escuro também em momentos mais imersivos;
- cards ou vitrines de projetos objetivos, legíveis e fáceis de comparar, sem competir com o hero;
- interações leves e progressivas conforme o scroll;
- introdução sutil do mascote ou assistente digital;
- validação inicial de linguagem visual, espaçamentos, cards, botões e seções.

Fora da V1 visual:

- modo explorável completo;
- dashboard compacto na primeira dobra;
- tentativa de mostrar projetos, métricas, atividades, documentação e bot no mesmo espaço;
- mascote como assistente funcional;
- experiência 3D ou mundo navegável;
- tokens finais do design system;
- documentação oficial no YABook antes de validação prática.

### V1.5 - Exploração visual inicial

Objetivo: criar uma primeira camada explorável dentro da Home sem substituir a navegação tradicional.

Entregas previstas:

- seção "Explore o laboratório";
- representação visual dos projetos e áreas da YA LABS;
- microinterações em cards, links e elementos de navegação;
- mascote atuando como guia contextual em pontos específicos;
- alternativa objetiva para todas as informações exibidas de forma visual;
- testes de responsividade, acessibilidade e performance da camada interativa.

Fora da V1.5 visual:

- transformar a exploração visual no único caminho de navegação;
- bloquear conteúdo importante atrás de interação;
- depender de animações para compreensão da interface.

### V2 visual - Modo Explorar

Objetivo: criar uma experiência separada para explorar o ecossistema da YA LABS de forma mais marcante.

Entregas previstas:

- entrada específica para o modo "Explorar o laboratório";
- navegação visual por áreas, projetos, documentos e iniciativas;
- mascote ou assistente digital como guia principal da experiência;
- interações mais expressivas, mas ainda acessíveis;
- fallback para navegação tradicional;
- respeito a `prefers-reduced-motion`;
- validação de performance em dispositivos comuns.

Fora da V2 visual:

- substituir as páginas objetivas de projetos e documentos;
- criar uma experiência pesada antes da identidade visual estar validada;
- tratar o mascote como decoração solta, sem função clara.

### V3 visual - Experiência integrada ao ecossistema

Objetivo: conectar a experiência visual a dados reais e transformar decisões validadas em padrões reutilizáveis.

Entregas previstas:

- interações conectadas a dados reais de projetos, atividades ou releases;
- mascote evoluindo para assistente reutilizável da YA LABS;
- possíveis integrações com documentação, Discord, changelog ou automações;
- padrões visuais extraídos para o YABook;
- tokens, componentes e regras documentados apenas após validação no YAHub.

Fora da V3 visual:

- oficializar padrões que ainda não foram testados;
- acoplar identidade visual a uma única página ou interação;
- transformar experimentos visuais em obrigação para todos os produtos.

## Diretriz de evolução

O YAHub deve ser planejado para integrar melhor com YABook, Spotifolio e Discord no futuro, mas não deve depender dessas integrações para funcionar nas primeiras versões.

A evolução visual deve seguir a mesma lógica: começar com uma identidade aplicável e útil, validar interações em partes controladas da interface e só depois transformar padrões em design system oficial no YABook.
