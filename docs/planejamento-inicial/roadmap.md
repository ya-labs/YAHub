# Roadmap inicial do YA Hub

## Visão geral

O roadmap do YA Hub deve organizar a evolução do produto em versões incrementais. Cada versão precisa entregar valor próprio e preparar a próxima sem transformar a primeira entrega em uma plataforma grande demais.

## V1 - Portal público full-stack

Objetivo: colocar o YA Hub no ar como portal oficial da YA LABS, com front-end e back-end próprios.

Entregas previstas:

- front-end em React, TypeScript e Vite;
- back-end inicial do YA Hub;
- integração do back-end com a GitHub API;
- Home do portal;
- listagem de projetos;
- listagem de membros;
- atividade recente simples;
- exibição básica do Spotifolio como projeto da YA LABS;
- contratos de API limpos para o front-end;
- configuração inicial para dados que o GitHub não cobre;
- direção visual inicial alinhada ao design system da YA LABS.

Fora da V1:

- painel administrativo;
- autenticação de administradores;
- upload de imagens;
- escrita automática em repositórios;
- integração real com Spotifolio;
- bot ou automações no Discord.

Critério de direção visual: a V1 deve validar a linguagem institucional do YA Hub sem tentar consolidar todo o design system da organização dentro deste repositório.

## V2 - Metadados ricos por projeto

Objetivo: permitir que cada projeto seja dono das próprias informações públicas usadas pelo YA Hub.

Entregas previstas:

- padrão `.yahub/project.json` nos repositórios dos projetos;
- pasta `.yahub/assets/` para imagens de showcase;
- back-end consumindo metadados dos repositórios;
- fallback para projetos sem `.yahub/project.json`;
- página individual de projeto;
- showcase com imagens;
- links de site/deploy e repositório;
- tecnologias;
- equipe;
- notas de atualização;
- status e informações ricas de produto.

Fora da V2:

- edição visual dos metadados;
- painel administrativo;
- upload pelo YA Hub;
- criação automática de Pull Request.

## V3 - Painel administrativo

Objetivo: permitir que administradores mantenham os metadados dos projetos sem editar arquivos manualmente.

Entregas previstas:

- área administrativa;
- autenticação de administradores;
- listagem de projetos editáveis;
- edição visual do `.yahub/project.json`;
- upload ou versionamento de assets;
- preview antes de publicar;
- validação dos dados no back-end;
- criação automática de branch;
- abertura de Pull Request no repositório do projeto.

Fora da V3:

- transformar o Spotifolio em dependência do YA Hub;
- bot completo no Discord;
- automações críticas sem revisão.

## V4 - Integração com Spotifolio

Objetivo: conectar o portfólio institucional da YA LABS com os portfólios pessoais do Spotifolio.

Entregas previstas:

- vínculo entre membros do YA Hub e perfis do Spotifolio;
- links automáticos para perfis;
- projetos da YA LABS vinculados aos perfis dos membros;
- possível badge de membro oficial da YA LABS;
- possível consumo de dados públicos do Spotifolio pelo YA Hub;
- possível consumo de dados do YA Hub pelo Spotifolio.

Fora da V4:

- transformar o Spotifolio em seção interna do YA Hub;
- obrigar todo usuário do Spotifolio a ser membro da YA LABS;
- tornar o YA Hub dependente do Spotifolio para funcionar.

## V5 - Discord e automações

Objetivo: transformar o Discord em um canal vivo de comunicação da organização.

Entregas previstas:

- webhooks;
- notificações de releases, Pull Requests, issues e commits relevantes;
- changelog automático;
- comandos básicos;
- possível bot próprio da YA LABS;
- integração com dados do back-end do YA Hub.

Fora da V5:

- substituir o YA Hub como fonte pública de informação;
- misturar regras de produto do Spotifolio;
- publicar automações críticas sem revisão.

## Roadmap visual e de experiência

Esta trilha orienta a evolução visual do YA Hub em paralelo ao roadmap funcional. Ela deve ajudar a validar a identidade da YA LABS em uso real antes de extrair padrões reutilizáveis para o YABook.

### V1 - Identidade aplicada e Home marcante

Objetivo: aplicar uma primeira versão da identidade visual da YA LABS no portal público, com uma Home narrativa, memorável e objetiva.

Entregas previstas:

- Hero quase fullscreen apresentando a YA LABS, não o dashboard do YA Hub;
- Home institucional com primeira impressão forte, scroll narrativo e direção de laboratório futurista + sistema operacional técnico;
- seções amplas com uma ideia por vez;
- hero com `YA LABS` como protagonista, `YA` seguindo o símbolo oficial da marca com o corte correto no `A`, microdetalhes de terminal, arte ASCII/YA Mark, `status: online` e CTA `Acessar o portal`;
- navbar minimalista com identidade técnica e itens numerados;
- ASCII/YA Mark grande e central, com partículas, pontos, linhas orbitais, plataforma circular e sensação de formação/renderização;
- fundo branco/cinza muito claro, nuvens/fumaça sutis e chão/grid de laboratório na parte inferior;
- painéis flutuantes com dados técnicos e painel inferior operacional integrado ao fundo, sem virar dashboard compacto;
- seção "Construímos como laboratório" começando após a primeira dobra, sem aparecer como prévia no hero;
- seção "Ecossistema YA", separando YAHub, YABook, YAGit e YABot;
- seção "Como uma ideia vira produto", conectando ideia, documentação, issue, branch, Pull Request e release;
- seção "Produtos", separando SVNFlow, DevLab, Spotifolio, CADE-O-DANO, RMAWorker e Meu Treino;
- seção "Central YAHub", apresentando o YA Hub como portal oficial do ecossistema;
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
- tokens, componentes e regras documentados apenas após validação no YA Hub.

Fora da V3 visual:

- oficializar padrões que ainda não foram testados;
- acoplar identidade visual a uma única página ou interação;
- transformar experimentos visuais em obrigação para todos os produtos.

## Diretriz de evolução

O YA Hub deve ser planejado para integrar com painel admin, Spotifolio e Discord no futuro, mas não deve depender dessas integrações para funcionar nas primeiras versões.

A evolução visual deve seguir a mesma lógica: começar com uma identidade aplicável e útil, validar interações em partes controladas da interface e só depois transformar padrões em design system oficial no YABook.
