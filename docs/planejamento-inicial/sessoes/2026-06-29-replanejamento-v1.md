# Replanejamento funcional da V1

## Contexto

Esta sessão consolidou a nova direção funcional da V1 do YA Hub após a separação entre Home institucional, Portal público e painel administrativo básico.

O objetivo foi corrigir o rumo do produto antes de avançar no roadmap e evitar que a implementação siga documentos antigos que ainda tratavam painel admin e metadados por repositório como fases futuras.

## Decisões aprovadas

- A Home institucional fica em `/` e apresenta a YA LABS.
- O Portal fica em `/portal` e funciona como área navegável para explorar projetos, membros, documentação externa, atividade e status.
- A stack do front-end ainda não está fechada; Angular foi uma hipótese inicial, mas não deve ser tratado como decisão definitiva.
- O admin fica na mesma aplicação front-end do YA Hub.
- Projetos serão cadastrados no admin.
- Membros serão cadastrados no admin.
- A atividade GitHub entra na V1 como dado real.
- Login e cadastro administrativo entram na V1.
- O cadastro administrativo deve ser controlado antes de produção, evitando criação pública aberta de administradores.
- A página `/portal/projetos/:slug` entra completa na V1.
- A área de projetos separa `produto` e `ecossistema`.
- Ecossistema é uma categoria de projeto, não uma rota própria.
- Todo projeto cadastrado deve possuir exatamente um repositório principal e público no GitHub.
- O Admin lista os repositórios públicos da organização `ya-labs` e aceita URL pública para projetos orientados.
- Projetos oficiais pertencem à organização `ya-labs`.
- Projetos orientados pertencem a membros ou parceiros, usam categoria `produto` e continuam mantidos por seus autores.
- O vínculo `oficial` ou `orientado` é derivado da origem do repositório.
- Os metadados oficiais dos projetos ficam no banco do YA Hub.
- O GitHub é fonte complementar para dados técnicos e documentação inicial dos projetos.
- Documentação interna dos projetos não entra na V1.
- A V1 deve preparar integração futura com o YABook, como a ação `Abrir com o YABook`, quando esse suporte existir.
- `.yahub/project.json` não é fonte oficial da V1.

## Valores fechados

Categorias de projeto:

- `produto`;
- `ecossistema`.

Status de projeto:

- `ideia`;
- `planejamento`;
- `desenvolvimento`;
- `ativo`;
- `pausado`;
- `arquivado`.

Visibilidade:

- `publico`;
- `oculto`.

Vínculo:

- `oficial`;
- `orientado`.

Tipos de apoio para projetos orientados:

- `apoio_tecnico`;
- `documentacao`;
- `revisao`;
- `divulgacao`;
- `mentoria`.

## Fora da V1

- Documentação interna dos projetos dentro do YA Hub.
- Upload de imagens.
- Permissões administrativas granulares.
- Editor rico ou CMS completo.
- Workflow de aprovação.
- Criação automática de Pull Requests.
- Escrita automática em repositórios externos.
- Integração real com Spotifolio.
- Bot ou automações no Discord.
- `.yahub/project.json` como fonte oficial.
- Projetos sem repositório público no GitHub.
- Mais de um repositório principal por projeto.

## Impactos

- O roadmap deixa de tratar painel admin como V3.
- A documentação de projetos deixa de assumir metadados por repositório como direção da V1.
- Os contratos da API passam a considerar endpoints administrativos para projetos e membros.
- O back-end passa a ter PostgreSQL como fonte oficial dos metadados editoriais.
- GitHub permanece relevante para atividade, repositório e acesso inicial à documentação.
- O cadastro de projetos passa a começar pela descoberta ou validação de um repositório público no GitHub.
- A página pública de projetos passa a distinguir Produtos, Ecossistema e Projetos orientados pela YA LABS.

## Pendências

- Validar os contratos conceituais contra a implementação real conforme front-end e back-end avançarem.
- Refinar o modelo de membros durante a implementação sem criar dependência do Spotifolio.
- Definir o controle de cadastro administrativo que será usado antes da publicação.
