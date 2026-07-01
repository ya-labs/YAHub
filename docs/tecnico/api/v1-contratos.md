# Contratos conceituais da API V1

## Objetivo

Este documento registra os contratos conceituais da API V1 do YA Hub.

Os nomes finais de DTOs, propriedades e rotas podem ser refinados durante a implementação, mas a intenção da API deve permanecer clara: entregar dados públicos da YA LABS já tratados para o front-end e permitir manutenção administrativa básica de projetos e membros.

Este documento é conceitual. Quando a implementação definir contratos reais, os exemplos devem ser atualizados para refletir o comportamento efetivo da API.

## Padrão de resposta

A API deve usar um envelope de resposta inspirado no `ServiceResult<T>` usado no CADE O DANO.

Exemplo de sucesso:

```json
{
  "result": true,
  "message": null,
  "data": {}
}
```

Exemplo de falha:

```json
{
  "result": false,
  "message": "Não foi possível buscar os projetos da YA LABS.",
  "data": null
}
```

## Endpoints previstos

```text
GET /api/organization
GET /api/projects
GET /api/projects/{slug}
GET /api/members
GET /api/members/{slug}
GET /api/activity
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

## GET /api/organization

Retorna informações públicas da organização para a Home do YA Hub.

Dados esperados:

- nome da organização;
- descrição;
- links oficiais;
- resumo estatístico simples;
- destaque institucional.

Exemplo conceitual:

```json
{
  "result": true,
  "message": null,
  "data": {
    "name": "YA LABS",
    "description": "Organização voltada a desenvolvimento de produtos, estudos técnicos e experimentos de software.",
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/ya-labs"
      }
    ],
    "stats": {
      "projects": 6,
      "members": 3
    }
  }
}
```

## GET /api/projects

Retorna a listagem de projetos públicos exibidos no YA Hub.

Dados esperados:

- identificador;
- slug;
- nome de exibição;
- categoria;
- descrição curta;
- status;
- linguagem principal;
- URL do repositório;
- URL do site, quando existir;
- data da última atualização;
- indicação de destaque.

Exemplo conceitual:

```json
{
  "result": true,
  "message": null,
  "data": [
    {
      "id": "cade-o-dano",
      "slug": "cade-o-dano",
      "displayName": "CADE O DANO",
      "category": "produto",
      "shortDescription": "Projeto desenvolvido para testar APIs do League of Legends.",
      "status": "Em desenvolvimento",
      "primaryLanguage": "TypeScript",
      "repositoryUrl": "https://github.com/ya-labs/CADE-O-DANO",
      "websiteUrl": "https://ya-labs.github.io/CADE-O-DANO/",
      "updatedAt": "2026-06-05T15:20:28Z",
      "featured": true
    }
  ]
}
```

## GET /api/projects/{slug}

Retorna o detalhe básico de um projeto.

Na V1, este endpoint não deve depender de `.yahub/project.json`. O detalhe deve usar metadados cadastrados no banco do YA Hub e pode combinar dados complementares vindos da GitHub API.

Dados esperados:

- dados do projeto;
- links;
- responsáveis;
- tecnologias;
- últimas atividades simples.

## GET /api/members

Retorna membros oficiais da YA LABS exibidos no YA Hub.

Dados esperados:

- identificador;
- nome;
- papel principal;
- responsabilidades;
- GitHub;
- vínculo futuro com Spotifolio;
- projetos relacionados.

Exemplo conceitual:

```json
{
  "result": true,
  "message": null,
  "data": [
    {
      "id": "nicolas",
      "name": "Nícolas Machado Cardoso",
      "role": "Product / Front-end / UX",
      "githubUsername": "yoriyoi",
      "spotifolioUsername": null,
      "responsibilities": [
        "Idealização do YA Hub",
        "Direção funcional",
        "Front-end"
      ]
    }
  ]
}
```

## GET /api/members/{slug}

Retorna o detalhe público de um membro oficial da YA LABS.

Dados esperados:

- dados públicos do membro;
- papel principal e responsabilidades;
- GitHub;
- projetos relacionados;
- vínculo futuro com Spotifolio, quando existir.

Membros ocultos não devem ser retornados por este endpoint.

## GET /api/activity

Retorna atividade recente simples da organização.

Na V1, a atividade deve ser limitada para evitar complexidade excessiva.

Fontes possíveis:

- commits recentes;
- última atualização dos repositórios;
- releases, se estiverem disponíveis e forem úteis.

Dados esperados:

- tipo da atividade;
- projeto relacionado;
- descrição;
- autor, quando disponível;
- data;
- URL de referência.

## POST /api/login

Autentica um usuário administrativo.

Entrada esperada:

```json
{
  "email": "caio@email.com",
  "password": "senha"
}
```

Resposta esperada:

```json
{
  "result": true,
  "message": null,
  "data": {
    "token": "jwt",
    "user": {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "Caio",
      "email": "caio@email.com"
    }
  }
}
```

## POST /api/register

Cadastra um usuário administrativo.

Este endpoint pode existir na V1 para acompanhar a base inicial planejada do back-end. Antes de produção, o fluxo deve ter algum controle para não permitir cadastro público aberto de administradores.

Entrada esperada:

```json
{
  "name": "Caio",
  "email": "caio@email.com",
  "password": "senha"
}
```

Resposta esperada:

```json
{
  "result": true,
  "message": "Usuário cadastrado com sucesso.",
  "data": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Caio",
    "email": "caio@email.com"
  }
}
```

## Endpoints administrativos de projetos

Endpoints previstos:

```text
GET /api/admin/projects
POST /api/admin/projects
PUT /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
```

Campos obrigatórios:

- `slug`;
- `displayName`;
- `tagline`;
- `shortDescription`;
- `fullDescription`;
- `category`;
- `status`;
- `visibility`;
- `repositoryUrl`;
- `websiteUrl`;
- `documentationUrl`;
- `technologies`;
- `featured`;
- `displayOrder`.

Valores fechados:

- `category`: `produto`, `ecossistema`;
- `status`: `ideia`, `planejamento`, `desenvolvimento`, `ativo`, `pausado`, `arquivado`;
- `visibility`: `publico`, `oculto`.

Na interface administrativa, os campos podem ser exibidos em português. No payload da API, o contrato deve permanecer consistente com os nomes técnicos acima.

## Endpoints administrativos de membros

Endpoints previstos:

```text
GET /api/admin/members
POST /api/admin/members
PUT /api/admin/members/{id}
DELETE /api/admin/members/{id}
```

O modelo final de membro pode ser refinado durante a implementação, mas a V1 deve permitir cadastro e manutenção dos membros exibidos no portal.

## Fora da API V1

Não fazem parte da API V1:

- documentação interna dos projetos;
- upload;
- escrita em repositórios;
- criação de Pull Requests;
- cadastro público aberto de administradores sem controle;
- permissões administrativas granulares;
- Discord;
- integração real com Spotifolio;
- leitura de `.yahub/project.json`.

## Regra para o front-end

O front-end deve consumir os dados já tratados pelo back-end.

Ele não deve depender do formato bruto da GitHub API, porque a origem dos dados pode mudar nas próximas versões.
