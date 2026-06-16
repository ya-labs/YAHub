# Visão geral do YA Hub

## Objetivo

O YA Hub é o portal oficial da YA LABS.

Ele deve apresentar a organização, seus projetos, membros, atividades e evolução técnica em um único lugar. A proposta não é criar apenas uma página institucional, mas um painel vivo da organização, conectado aos produtos e às integrações que serão construídas ao longo do tempo.

O YA Hub responde principalmente:

```text
O que a YA LABS constrói?
```

## YA LABS e YA Hub

A YA LABS é a organização responsável por reunir projetos, estudos técnicos, produtos, experimentos e iniciativas de software.

O YA Hub é um produto dentro da YA LABS. Ele funciona como o portal central da organização, mostrando o que está sendo construído, quem participa, quais projetos estão ativos e como a organização evolui.

Essa separação evita confusão entre marca e produto:

- **YA LABS:** organização e marca principal.
- **YA Hub:** portal oficial, portfólio institucional e referência visual da organização.
- **DevLab:** base de estudos, trilhas e materiais técnicos.
- **Spotifolio:** plataforma futura de portfólios pessoais/interativos.
- **Projetos:** produtos e experimentos independentes criados dentro da organização.

## Papel do produto

O YA Hub deve centralizar informações públicas e úteis sobre a YA LABS:

- projetos ativos e planejados;
- membros e responsáveis;
- status dos produtos;
- dados vindos do GitHub;
- links oficiais;
- roadmap e evolução;
- futuras integrações com Spotifolio e Discord.

Além disso, o YA Hub deve ajudar a validar a identidade visual da YA LABS em uma experiência pública real.

O GitHub será uma fonte técnica importante, mas não será a única fonte de contexto. O backend do YA Hub será responsável por buscar, tratar e entregar os dados em contratos próprios para o front-end.

## Responsabilidades iniciais

- **Nícolas Machado Cardoso:** idealizador do YA Hub, responsável pelo produto, direção funcional, UX e front-end.
- **Caio Matheus Queiroz:** responsável pelo back-end, contratos de API e tratamento dos dados.
- **Wagner Araujo Bastos:** apoio futuro em plataforma e infraestrutura, especialmente em hospedagem e deploy do back-end.

As responsabilidades podem evoluir conforme o projeto crescer, mas essa divisão inicial ajuda a manter clareza, organização e mérito nas entregas.

## Princípios

- O YA Hub deve ser específico do produto, sem duplicar padrões gerais do YABook.
- O backend deve funcionar como camada de contrato entre integrações externas e front-end.
- O GitHub deve ser usado como fonte técnica de dados dos repositórios.
- Os projetos devem ser donos futuros dos seus próprios metadados ricos.
- O YA Hub deve agregar e apresentar informações, não virar depósito manual de todos os projetos.
- A direção visual do YA Hub deve respeitar o design system da YA LABS e alimentar o YABook apenas quando uma decisão se tornar reutilizável.
- Integrações futuras devem ser planejadas desde cedo, mas não podem bloquear as primeiras versões.
- A evolução deve ser incremental, com cada versão entregando valor real.

## Relação com o YABook

O YABook é a fonte oficial da YA LABS para padrões organizacionais, como condução de projetos, fluxo de trabalho, issues, branches, commits, Pull Requests, uso de IA, documentação técnica e design system.

O YA Hub deve manter apenas documentação própria do produto, como visão, roadmap, arquitetura, integrações, APIs, deploy e decisões técnicas específicas.
