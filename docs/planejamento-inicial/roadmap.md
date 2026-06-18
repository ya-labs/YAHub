# Roadmap inicial do YA Hub

## Visão geral

O roadmap do YA Hub deve organizar a evolução do produto em versões incrementais. Cada versão precisa entregar valor próprio e preparar a próxima sem transformar a primeira entrega em uma plataforma grande demais.

## V1 - Portal público full-stack

Objetivo: colocar o YA Hub no ar como portal oficial da YA LABS, com front-end e back-end próprios.

Entregas previstas:

- front-end em Angular e TypeScript;
- back-end inicial do YA Hub;
- integração do back-end com a GitHub API;
- Home do portal;
- listagem de projetos;
- listagem de membros;
- atividade recente simples;
- exibição básica do Spotifolio como projeto da YA LABS;
- contratos de API limpos para o front-end;
- configuração inicial para dados que o GitHub não cobre.
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

## Diretriz de evolução

O YA Hub deve ser planejado para integrar com painel admin, Spotifolio e Discord no futuro, mas não deve depender dessas integrações para funcionar nas primeiras versões.
