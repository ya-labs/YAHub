# Guia de documentação para IA

Este documento orienta assistentes de IA a consultar, manter e atualizar a documentação do YAHub com economia de contexto.

Backlog, progresso, responsáveis, Project, milestones e execução devem ficar no GitHub. A documentação deve registrar conhecimento estável do produto.

## Fluxo de consulta

1. Leia o `AGENTS.md`.
2. Leia este guia quando a tarefa envolver documentação.
3. Identifique o tipo da tarefa.
4. Consulte a matriz documental.
5. Use `rg` com palavras-chave direcionadas.
6. Abra documentos completos somente quando o trecho localizado não for suficiente.

Não leia todos os documentos por padrão. Leitura ampla é adequada quando a tarefa pedir atualização estrutural, como revisão completa da documentação, processo, arquitetura, contrato, requisito, fluxo, ADR, RFC ou planejamento.

## Matriz documental

| Área | Função | Quando consultar | Quando atualizar |
| --- | --- | --- | --- |
| `README.md` | Entrada pública do projeto. | Visão geral e links principais. | Mudança de posicionamento ou leitura inicial. |
| `docs/README.md` | Índice geral. | Localizar documentos disponíveis. | Novo documento, pasta ou mudança de organização. |
| `docs/guia-da-documentacao.md` | Roteiro de consulta. | Saber onde atualizar cada assunto. | Mudança na estrutura documental. |
| `docs/fluxo-de-trabalho-github.md` | Regras locais de trabalho. | Confirmar adaptações do YAHub ao YABook. | Mudança de fluxo local. |
| `docs/planejamento-inicial/` | Planejamento do produto. | Visão, roadmap, arquitetura conceitual e integrações. | Mudança de escopo, fase ou direção do produto. |
| `docs/tecnico/arquitetura/` | Arquitetura técnica. | Estrutura, responsabilidades e decisões técnicas da V1. | Mudança estrutural relevante. |
| `docs/tecnico/api/` | Contratos conceituais. | Endpoints, DTOs e formato esperado de resposta. | Mudança de contrato, rota ou estado esperado. |

## Uso do YABook

Consulte o YABook quando a tarefa envolver padrão geral da YA LABS:

- condução de projetos;
- fluxo de trabalho com GitHub;
- uso de IA;
- documentação técnica;
- design system;
- templates reutilizáveis.

Não copie o conteúdo do YABook para o YAHub. Se existir uma regra geral nova, referencie o YABook e registre aqui apenas a adaptação específica do produto.

## Premissas do YAHub

- O YAHub é o portal oficial da YA LABS.
- O produto deve evoluir de forma incremental.
- A V1 será um portal público full-stack.
- O front-end não deve consumir a GitHub API diretamente.
- O back-end deve tratar integrações externas e entregar contratos estáveis ao front-end.
- O YAHub deve servir como referência visual institucional da YA LABS.
- Decisões reutilizáveis para outros projetos devem ser consolidadas no YABook.

## Quando avisar antes de editar

Avise antes de alterar arquivos quando:

- não houver issue relacionada e a mudança for relevante;
- a branch atual não combinar com a tarefa;
- a alteração puder mudar escopo, arquitetura, contrato ou processo;
- houver risco de duplicar regra que pertence ao YABook;
- a tarefa exigir inventar contrato ou integração ainda não definidos.

Se a pessoa usuária autorizar explicitamente a exceção, registre isso no resumo final.
