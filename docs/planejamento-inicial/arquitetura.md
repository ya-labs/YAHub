# Arquitetura planejada do YA Hub

## Visão geral

A arquitetura do YA Hub deve começar simples, mas preparada para evolução. A V1 já será full-stack para permitir que o back-end centralize integrações, trate dados externos e entregue contratos estáveis para o front-end.

## V1 - Portal público e admin básico

Fluxo planejado:

```text
YA Hub Frontend
  -> YA Hub Backend
      -> GitHub API
      -> PostgreSQL
      -> dados editoriais cadastrados no admin
      -> tratamento dos dados
      -> contratos para o front-end
```

Responsabilidades do front-end:

- construir a Home institucional, o portal público e o admin básico;
- organizar componentes e rotas;
- cuidar da experiência visual;
- aplicar a direção visual institucional do YA Hub;
- consumir endpoints do back-end;
- não depender diretamente da origem real dos dados.

Responsabilidades do back-end:

- consultar a GitHub API;
- persistir projetos e membros no PostgreSQL;
- autenticar administradores;
- expor endpoints administrativos para projetos e membros;
- tratar e padronizar dados;
- proteger tokens quando necessário;
- definir contratos de resposta para o front-end;
- preparar base para cache, YABook, Spotifolio e Discord.

Endpoints conceituais iniciais:

```text
GET /api/organization
GET /api/projects
GET /api/projects/{slug}
GET /api/activity
GET /api/members
GET /api/members/{slug}
POST /api/login
POST /api/register
GET /api/admin/projects
POST /api/admin/projects
PUT /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
GET /api/admin/members
POST /api/admin/members
PUT /api/admin/members/{id}
DELETE /api/admin/members/{id}
```

Esses nomes representam a intenção inicial dos contratos e podem ser refinados durante a implementação técnica.

Na V1, `POST /api/register` representa o cadastro administrativo inicial planejado para o back-end. Antes de produção, esse fluxo deve ser protegido ou limitado para evitar cadastro público aberto de administradores.

## V2 - Portal público mais rico

Fluxo planejado:

```text
YA Hub Backend
  -> GitHub API
  -> PostgreSQL
  -> dados editoriais cadastrados no admin
  -> links externos dos projetos
```

Nessa fase, o back-end pode enriquecer as páginas públicas com mais dados editoriais e técnicos, mantendo o banco do YA Hub como fonte oficial dos metadados.

O YA Hub deve tratar três cenários:

- projeto cadastrado e visível no banco;
- projeto com GitHub indisponível ou sem dados técnicos complementares;
- falha ao buscar dados externos.

Em todos os casos, o front-end deve receber uma resposta previsível.

## Integração futura com YABook

Fluxo conceitual:

```text
YA Hub
  -> Abrir com o YABook
      -> documentação, contexto ou fluxo assistido do projeto
```

Na V1, essa integração deve ficar apenas preparada conceitualmente. Enquanto o YABook não oferecer suporte direto, a documentação dos projetos deve ser acessada pelo GitHub do repositório.

## V3 - Integração com Spotifolio

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

## V4 - Discord e automações

Fluxo conceitual:

```text
GitHub
  -> YA Hub Backend
      -> Discord/Webhooks/Bot
```

O back-end do YA Hub pode se tornar a camada central para tratar eventos e dados antes de enviá-los ao Discord.

## Separação de dados

- **GitHub:** dados técnicos e dinâmicos dos repositórios.
- **PostgreSQL:** fonte oficial dos metadados editoriais de projetos, membros, status, destaque, categoria e visibilidade.
- **Back-end do YA Hub:** tratamento, contratos, cache futuro, segurança e persistência.
- **Front-end:** apresentação e experiência, sem acoplamento direto com integrações externas.
