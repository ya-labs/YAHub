# Fluxo de trabalho do YAHub

O YAHub segue o fluxo oficial da YA LABS documentado no YABook:

- [Fluxo de trabalho com GitHub](https://github.com/ya-labs/YABook/blob/main/docs/processos/fluxo-de-trabalho-github.md)
- [Condução de projetos](https://github.com/ya-labs/YABook/blob/main/docs/processos/conducao-de-projetos.md)

Use o YABook como fonte principal para:

- issues;
- GitHub Projects;
- branches;
- commits;
- Pull Requests;
- releases;
- validações.

## Adaptações locais

O YAHub adota desenvolvimento delegado com IA para suas issues. O YABook
continua sendo a fonte do fluxo geral e do `mode: prod`; a adaptação local
define como o produto aplica esse modo:

- a issue é o espaço para discutir escopo, critérios de aceite, riscos e
  decisões relevantes;
- a IA implementa a issue dentro do escopo aprovado;
- decisões de produto e arquitetura relevante exigem aprovação de Nícolas
  antes da implementação;
- a Pull Request registra mudanças, justificativas, validações e pontos que
  exigem revisão;
- o merge depende do aceite explícito de Nícolas após revisar o código e o
  produto em execução.

Consulte o [protocolo de desenvolvimento delegado com IA](planejamento-inicial/sessoes/2026-07-10-protocolo-desenvolvimento-delegado-com-ia.md)
para o contexto e as decisões desta adoção.

Como o projeto ainda está em fase documental e inicial, alterações pequenas e relacionadas de documentação podem usar branch de lote documental quando fizerem parte do mesmo objetivo.

Exemplo:

```text
docs007-ajusta-documentacao-yabook
```

Use branch individual quando o tema tiver escopo próprio, exigir validação separada ou alterar uma decisão técnica relevante.

## Branch de desenvolvimento

O YAHub não deve assumir branch `dev` só por padrão.

Enquanto o projeto estiver em planejamento e documentação inicial, branch por issue com Pull Request para a branch principal é suficiente, salvo orientação diferente do time.

Uma branch de desenvolvimento deve ser adotada quando houver implementação ativa, trabalho paralelo e necessidade real de manter a branch principal apenas com entregas prontas.

## Regra principal

Registre aqui apenas diferenças locais do YAHub.

Regras completas e reutilizáveis de processo devem permanecer no YABook.
