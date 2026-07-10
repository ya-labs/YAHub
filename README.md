# YAHub

Portal oficial da YA LABS para apresentar a organização, seus projetos, membros, atividades e evolução técnica.

O YAHub será o painel público da organização: um lugar para centralizar projetos, exibir informações vindas do GitHub, registrar a evolução dos produtos mantidos pela YA LABS e servir como principal referência visual institucional do ecossistema.

## Visão geral

A YA LABS é uma organização voltada a desenvolvimento de produtos, estudos técnicos e experimentos de software.

Dentro desse ecossistema, o YAHub tem o papel de responder:

```text
O que a YA LABS constrói?
```

O projeto deve evoluir de forma incremental, começando com Home institucional, portal público full-stack e painel administrativo básico, abrindo caminho para integrações futuras com YABook, Spotifolio e automações no Discord.

O YAHub também terá papel importante na evolução do design system da YA LABS: decisões visuais estáveis podem nascer aqui e, depois de validadas em uso real, serem registradas no YABook como padrão reutilizável.

## Responsabilidades iniciais

- Nícolas Machado Cardoso: idealização do produto, direção funcional, UX e front-end.
- Caio Matheus Queiroz: back-end, contratos de API e tratamento dos dados.
- Wagner Araujo Bastos: apoio futuro em plataforma e infraestrutura, especialmente quando houver deploy do back-end.

As responsabilidades podem evoluir conforme o projeto crescer, mas essa divisão inicial ajuda a manter clareza e mérito nas entregas.

## Status

Em planejamento inicial.

## Stack prevista

- Front-end: React e TypeScript.
- Back-end: Java Spring Boot.
- Integrações: GitHub API na V1; YABook, Spotifolio e Discord em fases futuras.
- Infraestrutura: a definir, com possibilidade de uso da Azure para o back-end.

## Documentação do projeto

A documentação específica do YAHub fica em:

```text
docs/
```

Leitura inicial recomendada:

- [Índice da documentação](docs/README.md)
- [Guia de consulta da documentação](docs/guia-da-documentacao.md)
- [Guia de documentação para IA](docs/guia-de-documentacao-para-ia.md)

## Referência organizacional

Este projeto segue os padrões da YA LABS documentados no YABook:

- [YABook](https://github.com/ya-labs/YABook)

O YABook é a fonte oficial para:

- condução de projetos;
- fluxo de trabalho com GitHub;
- uso de IA;
- documentação técnica;
- design system;
- templates reutilizáveis.

O YAHub deve manter apenas documentação própria do produto. Regras gerais da organização devem continuar no YABook.

## Fluxo de trabalho

Mudanças relevantes devem seguir o fluxo da YA LABS:

```text
Issue -> Branch -> Commit -> Pull Request -> Merge -> Validação
```

Consulte o YABook para o processo completo e use `docs/fluxo-de-trabalho-github.md` apenas para adaptações locais do YAHub.
