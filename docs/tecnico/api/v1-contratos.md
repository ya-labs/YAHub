# Contratos conceituais da API V1

## Objetivo

Este documento registra os contratos conceituais da API V1 do YA Hub.

Os nomes finais de DTOs, propriedades e rotas podem ser refinados durante a implementação, mas a intenção da API deve permanecer clara: entregar dados públicos da YA LABS já tratados para o front-end.

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
GET /api/projects/:slug
GET /api/members
GET /api/activity
POST /api/register
POST /api/login
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

## GET /api/projects/:slug

Retorna o detalhe básico de um projeto.

Na V1, este endpoint ainda não deve depender de `.yahub/project.json`. O detalhe pode combinar dados vindos da GitHub API com configuração inicial do YA Hub.

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

## POST /api/register

Cadastra um usuário administrativo inicial.

Este endpoint foi antecipado para a V1 para permitir a evolução do cadastro de projetos pelo back-end.

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
  "message": null,
  "data": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Caio",
    "email": "caio@email.com"
  }
}
```

Regras:

- senha deve ser armazenada apenas como hash;
- `passwordHash` não deve ser retornado pela API;
- email deve ser único.

## POST /api/login

Autentica um usuário administrativo.

Entrada esperada:

```json
{
  "email": "caio@email.com",
  "password": "senha"
}
```

Resposta inicial esperada:

```json
{
  "result": true,
  "message": null,
  "data": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Caio",
    "email": "caio@email.com"
  }
}
```

Em uma evolução posterior, o login deve retornar token JWT para proteger endpoints administrativos.

## Fora da API V1

Não fazem parte da API V1:

- permissões;
- painel administrativo;
- upload;
- escrita em repositórios;
- criação de Pull Requests;
- Discord;
- integração real com Spotifolio;
- leitura de `.yahub/project.json`.

## Regra para o front-end

O front-end deve consumir os dados já tratados pelo back-end.

Ele não deve depender do formato bruto da GitHub API, porque a origem dos dados pode mudar nas próximas versões.
