# Conteúdo dos projetos no YAHub

## Objetivo

O YAHub deve apresentar projetos da YA LABS com informações úteis, visuais e atualizadas.

Na V1, os metadados oficiais dos projetos serão mantidos no banco de dados do YAHub e gerenciados pelo painel administrativo.

Todo projeto cadastrado deve possuir exatamente um repositório principal e público no GitHub. O repositório fornece identidade técnica e dados complementares, mas não será a fonte oficial dos dados editoriais exibidos no portal.

## Fonte de verdade da V1

Fonte principal:

- banco de dados do YAHub;
- painel administrativo do YAHub.

Fonte complementar:

- GitHub API para descobrir e validar repositórios públicos;
- GitHub API para dados técnicos, repositório e atividade recente.

Fora da V1:

- documentação interna dos projetos dentro do YAHub;
- `.yahub/project.json` como fonte oficial;
- assets versionados pelo YAHub;
- edição de metadados via Pull Request automático.

## Categorias de projeto

A listagem de projetos do portal deve separar:

- **Produtos:** projetos entregáveis para usuários ou mercado.
- **Ecossistema:** projetos internos, estruturais ou de suporte da YA LABS.

Ecossistema continua sendo projeto. Por isso, na V1, ele deve aparecer como categoria dentro de `/portal/projetos`, não como rota própria.

## Vínculo com a YA LABS

A categoria descreve o que o projeto é. O vínculo descreve sua relação com a YA LABS.

Valores de `affiliation`:

- `oficial`: projeto cujo repositório pertence à organização `ya-labs`;
- `orientado`: projeto independente de membro ou parceiro, mantido no perfil do próprio autor e apoiado pela YA LABS.

Projetos orientados:

- devem usar a categoria `produto`;
- devem apontar para um repositório público fora da organização `ya-labs`;
- continuam pertencendo e sendo mantidos por seus autores;
- devem deixar explícito no Portal que recebem apoio, mas não pertencem à YA LABS.

O Portal deve apresentar três agrupamentos:

- Produtos da YA LABS;
- Ecossistema YA;
- Projetos orientados pela YA LABS.

## Campos obrigatórios da V1

Campos mínimos do projeto:

- `githubRepositoryId`;
- `githubOwner`;
- `githubName`;
- `slug`;
- `displayName`;
- `tagline`;
- `shortDescription`;
- `fullDescription`;
- `category`;
- `affiliation`;
- `status`;
- `visibility`;
- `repositoryUrl`;
- `websiteUrl`;
- `documentationUrl`;
- `technologies`;
- `featured`;
- `displayOrder`.

Campos adicionais para projetos orientados:

- `authorDisplayName`;
- `supportTypes`;
- `yalabsMentorIds`.

Os nomes acima representam o contrato técnico esperado da API. Na interface administrativa, eles podem aparecer traduzidos para português, como Nome, Descrição curta, Categoria, Status e Visibilidade.

Campos relacionais previstos:

- membros relacionados;
- responsáveis;
- links complementares.

## Valores fechados

Categoria:

- `produto`;
- `ecossistema`.

Vínculo:

- `oficial`;
- `orientado`.

Tipos de apoio:

- `apoio_tecnico`;
- `documentacao`;
- `revisao`;
- `divulgacao`;
- `mentoria`.

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

A documentação interna dos projetos não entra na V1 do YAHub.

Na V1, quando a pessoa visitante quiser consultar documentação, o portal deve apontar para o GitHub do repositório.

O YAHub deve preparar uma integração futura com o YABook. Quando o YABook tiver suporte, cada projeto poderá exibir uma ação como:

```text
Abrir com o YABook
```

## Evitar duplicação

Informações editoriais pertencem ao YAHub.

Informações técnicas que o GitHub já fornece bem podem ser consumidas pela API e tratadas pelo back-end.

O identificador `githubRepositoryId` deve impedir o cadastro duplicado mesmo quando um repositório for renomeado. Se o repositório ficar indisponível, o projeto não deve ser apagado automaticamente do YAHub.

Exemplos:

- nome técnico do repositório;
- URL do repositório;
- linguagem principal;
- última atualização;
- estatísticas públicas;
- commits recentes.
