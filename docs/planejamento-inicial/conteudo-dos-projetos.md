# Conteúdo dos projetos no YA Hub

## Objetivo

O YA Hub deve apresentar projetos da YA LABS com informações úteis, visuais e atualizadas.

Na V1, os metadados oficiais dos projetos serão mantidos no banco de dados do YA Hub e gerenciados pelo painel administrativo.

O repositório GitHub de cada projeto pode ser vinculado como referência técnica, mas não será a fonte oficial dos dados editoriais exibidos no portal.

## Fonte de verdade da V1

Fonte principal:

- banco de dados do YA Hub;
- painel administrativo do YA Hub.

Fonte complementar:

- GitHub API para dados técnicos, repositório e atividade recente.

Fora da V1:

- documentação interna dos projetos dentro do YA Hub;
- `.yahub/project.json` como fonte oficial;
- assets versionados pelo YA Hub;
- edição de metadados via Pull Request automático.

## Categorias de projeto

A listagem de projetos do portal deve separar:

- **Produtos:** projetos entregáveis para usuários ou mercado.
- **Ecossistema:** projetos internos, estruturais ou de suporte da YA LABS.

Ecossistema continua sendo projeto. Por isso, na V1, ele deve aparecer como categoria dentro de `/portal/projetos`, não como rota própria.

## Campos obrigatórios da V1

Campos mínimos do projeto:

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

Os nomes acima representam o contrato técnico esperado da API. Na interface administrativa, eles podem aparecer traduzidos para português, como Nome, Descrição curta, Categoria, Status e Visibilidade.

Campos relacionais previstos:

- membros relacionados;
- responsáveis;
- links complementares.

## Valores fechados

Categoria:

- `produto`;
- `ecossistema`.

Status:

- `ideia`;
- `planejamento`;
- `desenvolvimento`;
- `ativo`;
- `pausado`;
- `arquivado`.

Visibilidade:

- `publico`;
- `oculto`.

## Documentação dos projetos

A documentação interna dos projetos não entra na V1 do YA Hub.

Na V1, quando a pessoa visitante quiser consultar documentação, o portal deve apontar para o GitHub do repositório.

O YA Hub deve preparar uma integração futura com o YABook. Quando o YABook tiver suporte, cada projeto poderá exibir uma ação como:

```text
Abrir com o YABook
```

## Evitar duplicação

Informações editoriais pertencem ao YA Hub.

Informações técnicas que o GitHub já fornece bem podem ser consumidas pela API e tratadas pelo back-end.

Exemplos:

- nome técnico do repositório;
- URL do repositório;
- linguagem principal;
- última atualização;
- estatísticas públicas;
- commits recentes.
