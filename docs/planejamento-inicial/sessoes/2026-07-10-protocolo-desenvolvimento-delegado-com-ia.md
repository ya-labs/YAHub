# Protocolo de desenvolvimento delegado com IA

## Contexto

O YAHub adota um modelo de desenvolvimento no qual a IA pode executar a maior
parte da implementação, enquanto Nícolas mantém a responsabilidade por produto,
escopo, decisões relevantes e aceite final.

O objetivo é acelerar a entrega sem perder rastreabilidade, capacidade de
manutenção ou aprendizado prático sobre as decisões que sustentam o produto.

## Decisões aprovadas

- O YAHub usa `mode: prod` como postura padrão de colaboração com IA.
- `mode: prod` define a autonomia da IA durante todo o ciclo da issue; não é
  uma ação pontual de implementação.
- A issue é o espaço para discutir problema, escopo, critérios de aceite,
  abordagem, riscos e decisões relevantes antes do desenvolvimento.
- `$yabook dev` inicia o desenvolvimento da issue atual conforme o escopo e as
  decisões previamente aprovados.
- A IA pode implementar soluções e propor alternativas, mas não deve ampliar
  escopo ou introduzir decisões arquiteturais relevantes sem aprovação.
- A Pull Request deve registrar o que mudou, por que mudou, como foi validado,
  como testar e quais pontos merecem revisão.
- O merge depende do aceite explícito de Nícolas após a revisão do diff e do
  produto em execução.

## Responsabilidades

| Etapa | Nícolas | IA |
| --- | --- | --- |
| Discussão da issue | Define objetivo, prioridade e aprova decisões relevantes. | Estrutura o problema, aponta riscos e propõe a abordagem. |
| Desenvolvimento | Acompanha decisões novas que ultrapassem o escopo acordado. | Implementa, valida e mantém a solução dentro do escopo. |
| Pull Request | Revisa código, comportamento e impacto no produto. | Documenta mudanças, justificativas, validações e pendências. |
| Merge | Dá o aceite final. | Não realiza merge sem solicitação explícita. |

## Guardrails

- A IA deve preferir a menor solução consistente com os padrões existentes.
- Decisões de produto, arquitetura relevante, autenticação, contratos de API,
  integrações externas e padrões reutilizáveis exigem discussão antes da
  implementação.
- A Pull Request não deve ser o primeiro momento em que uma decisão estrutural
  é apresentada para revisão.
- Conceitos novos ou críticos devem ser explicados a partir da alteração real,
  quando necessário para a revisão ou manutenção.
- O fato de uma solução funcionar não substitui revisão de legibilidade,
  consistência, acessibilidade, testes e impacto futuro.

## Impactos

- A documentação local registra somente a adaptação do YAHub; o significado
  geral de `mode: prod` e o processo reutilizável continuam no YABook.
- Issues passam a concentrar o contrato de execução, e Pull Requests passam a
  concentrar evidências de implementação, validação e revisão.
- O aprendizado ocorre por discussão, leitura de código, revisão e manutenção,
  sem exigir implementação manual de todo o código repetitivo.

## Pendências

- Avaliar, no YABook, se a definição geral de `mode: prod` deve explicitar o
  papel de revisão humana e a qualidade esperada da Pull Request.
