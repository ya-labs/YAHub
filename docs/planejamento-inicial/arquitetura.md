# Arquitetura planejada do YA Hub

## Visão geral

A arquitetura do YA Hub deve começar simples, mas preparada para evolução. A V1 já será full-stack para permitir que o back-end centralize integrações, trate dados externos e entregue contratos estáveis para o front-end.

## V1 - Portal público full-stack

Fluxo planejado:

```text
YA Hub Frontend
  -> YA Hub Backend
      -> GitHub API
      -> configuração inicial de produto
      -> tratamento dos dados
      -> contratos para o front-end
```

Responsabilidades do front-end:

- construir as telas públicas;
- organizar componentes e rotas;
- cuidar da experiência visual;
- aplicar a direção visual institucional do YA Hub;
- consumir endpoints do back-end;
- não depender diretamente da origem real dos dados.

Responsabilidades do back-end:

- consultar a GitHub API;
- tratar e padronizar dados;
- proteger tokens quando necessário;
- definir contratos de resposta para o front-end;
- preparar base para cache, painel admin, Spotifolio e Discord.

Endpoints conceituais iniciais:

```text
GET /api/organization
GET /api/projects
GET /api/projects/:slug
GET /api/activity
GET /api/members
```

Esses nomes representam a intenção inicial dos contratos e podem ser refinados durante a implementação técnica.

## V2 - Metadados ricos por projeto

Fluxo planejado:

```text
YA Hub Backend
  -> GitHub API
  -> .yahub/project.json dos repositórios
  -> assets dos projetos
  -> fallback/configuração inicial
```

Nessa fase, o back-end passa a buscar informações ricas nos próprios repositórios dos projetos.

O YA Hub deve tratar três cenários:

- projeto com `.yahub/project.json` válido;
- projeto sem metadados próprios;
- falha ao buscar dados externos.

Em todos os casos, o front-end deve receber uma resposta previsível.

## V3 - Painel administrativo

Fluxo planejado:

```text
YA Hub Admin
  -> YA Hub Backend
      -> autenticação
      -> GitHub API
      -> criação de branch
      -> alteração de .yahub/project.json
      -> versionamento de assets
      -> abertura de Pull Request
```

O painel administrativo não deve escrever diretamente na branch principal dos projetos. A publicação das alterações deve passar por Pull Request.

## V4 - Integração com Spotifolio

Fluxo conceitual:

```text
YA Hub
  <-> Spotifolio
```

Dados que podem servir como vínculo:

```text
memberId
githubUsername
spotifolioUsername
```

O YA Hub deve apontar para perfis do Spotifolio, e o Spotifolio pode apontar de volta para projetos no YA Hub.

## Relação com documentação e design system

A arquitetura específica do YA Hub deve ficar neste repositório.

Padrões reutilizáveis de documentação, condução de projeto, uso de IA, fluxo GitHub e design system devem permanecer no YABook.

Quando a implementação do portal consolidar decisões visuais reutilizáveis, essas decisões podem ser promovidas para o YABook. Enquanto forem específicas do portal, devem ficar em [Direção visual](direcao-visual.md).

## V5 - Discord e automações

Fluxo conceitual:

```text
GitHub
  -> YA Hub Backend
      -> Discord/Webhooks/Bot
```

O back-end do YA Hub pode se tornar a camada central para tratar eventos e dados antes de enviá-los ao Discord.

## Separação de dados

- **GitHub:** dados técnicos e dinâmicos dos repositórios.
- **Back-end do YA Hub:** tratamento, contratos, cache futuro e segurança.
- **`.yahub/project.json`:** metadados ricos definidos pelo próprio projeto.
- **Configuração inicial do YA Hub:** fallback, ordem, destaque e informações ainda não disponíveis nos projetos.
- **Front-end:** apresentação e experiência, sem acoplamento direto com integrações externas.
