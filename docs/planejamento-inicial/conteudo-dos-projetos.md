# Conteúdo dos projetos no YA Hub

## Objetivo

O YA Hub deve apresentar projetos da YA LABS com informações úteis, visuais e atualizadas. Para evitar que o YA Hub vire um repositório central de conteúdo manual, cada projeto poderá ser dono dos próprios metadados ricos.

## Estrutura planejada

Cada projeto poderá ter:

```text
.yahub/
  project.json
  assets/
    cover.png
    screenshot-1.png
    screenshot-2.png
```

O arquivo `project.json` guarda as informações públicas do projeto. A pasta `assets/` guarda imagens usadas no showcase.

Esse formato é uma proposta específica do YA Hub para metadados de projetos. Se futuramente esse padrão virar reutilizável para outros produtos da YA LABS, a parte geral deve ser consolidada no YABook.

## Campos planejados

Campos iniciais esperados:

- `displayName`;
- `slug`;
- `shortDescription`;
- `description`;
- `status`;
- `category`;
- `websiteUrl`;
- `repositoryUrl`;
- `technologies`;
- `team`;
- `featuredImage`;
- `showcase`;
- `updateNotes`;
- `links`.

## Exemplo

```json
{
  "displayName": "CADE O DANO",
  "slug": "cade-o-dano",
  "shortDescription": "Consulta de dados e estatísticas de jogadores.",
  "description": "Aplicação para consultar dados de League of Legends usando a Riot API.",
  "status": "Em desenvolvimento",
  "category": "Produto",
  "websiteUrl": "https://ya-labs.github.io/CADE-O-DANO/",
  "repositoryUrl": "https://github.com/ya-labs/CADE-O-DANO",
  "technologies": ["React", "TypeScript", "Riot API"],
  "team": ["nicolas", "caio"],
  "featuredImage": ".yahub/assets/cover.png",
  "showcase": [
    {
      "title": "Busca por jogador",
      "description": "Tela principal para consultar jogadores pelo Riot ID.",
      "image": ".yahub/assets/search-page.png"
    }
  ],
  "updateNotes": [
    {
      "version": "0.3.0",
      "date": "2026-06-06",
      "notes": [
        "Adicionada tela de histórico de partidas.",
        "Melhorado layout mobile."
      ]
    }
  ],
  "links": [
    {
      "label": "Site",
      "url": "https://ya-labs.github.io/CADE-O-DANO/"
    }
  ]
}
```

## Responsabilidade dos dados

O projeto é dono dos próprios metadados ricos.

O YA Hub deve:

- buscar os metadados;
- tratar ausências ou inconsistências;
- juntar dados ricos com dados técnicos do GitHub;
- apresentar as informações no portal.

O YA Hub não deve duplicar manualmente tudo que pertence ao projeto.

O GitHub continua sendo fonte de versionamento e revisão. Quando o painel administrativo existir, alterações nesses metadados devem passar por branch e Pull Request, seguindo o fluxo do YABook.

## Fallback

Se um projeto ainda não tiver `.yahub/project.json`, o YA Hub deve usar dados disponíveis no GitHub e uma configuração inicial mínima.

Esse fallback permite migrar projeto por projeto, sem bloquear a evolução do portal.

## Imagens

As imagens de showcase devem ficar no repositório do próprio projeto, dentro de `.yahub/assets/`.

Isso mantém os assets próximos do produto que eles representam e evita que o YA Hub vire um depósito de imagens de todos os projetos.

## Evitar duplicação

Informações que o GitHub já fornece bem não devem ser duplicadas sem motivo.

Exemplos de dados normalmente vindos do GitHub:

- nome técnico do repositório;
- URL do repositório;
- linguagem principal;
- última atualização;
- estatísticas públicas;
- commits recentes.

Exemplos de dados editoriais que podem ficar no `project.json`:

- nome de exibição;
- descrição de produto;
- status;
- equipe;
- showcase;
- notas de atualização;
- links públicos relevantes.
