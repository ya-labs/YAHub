# Painel administrativo do YA Hub

## Objetivo

O painel administrativo será a forma futura de manter os metadados dos projetos sem editar arquivos manualmente.

Ele deve facilitar a atualização de descrições, links, imagens, showcase e notas de atualização, preservando revisão e histórico pelo GitHub.

O fluxo de publicação deve seguir o YABook: mudanças relevantes precisam manter rastreabilidade entre issue, branch, commit, Pull Request e validação.

## Papel no roadmap

O painel administrativo está planejado para a V3.

Antes disso, a V1 deve estabelecer o portal full-stack e a V2 deve definir o padrão de metadados por projeto.

## Fluxo planejado

```text
Admin acessa o painel
  -> escolhe um projeto
  -> back-end carrega .yahub/project.json
  -> admin edita descrição, links, showcase e notas
  -> admin anexa imagens
  -> painel mostra preview
  -> back-end valida os dados
  -> back-end cria branch no repositório do projeto
  -> back-end altera project.json e assets
  -> back-end abre Pull Request
  -> owners revisam e fazem merge
  -> YA Hub passa a exibir os dados atualizados
```

## Por que usar Pull Request

O painel não deve fazer commit direto na branch principal.

Usar Pull Request traz:

- revisão antes da publicação;
- histórico claro;
- menor risco de quebrar produção;
- rastreabilidade;
- alinhamento com o fluxo profissional da YA LABS.

Esse comportamento não é uma regra exclusiva do YA Hub; é uma aplicação do fluxo oficial da YA LABS documentado no YABook.

## Responsabilidades

Front-end:

- telas administrativas;
- formulários;
- upload visual de arquivos;
- preview;
- estados de validação e erro;
- experiência de edição.

Back-end:

- autenticação;
- integração com GitHub API;
- leitura e escrita do `.yahub/project.json`;
- validação dos dados;
- versionamento de assets;
- criação de branch;
- abertura de Pull Request.

Plataforma:

- hospedagem;
- variáveis de ambiente;
- configuração segura de tokens;
- observabilidade e suporte ao deploy.

## Limites da V3

A V3 deve focar manutenção de metadados dos projetos.

Ficam fora dessa fase:

- rede social do Spotifolio;
- bot completo no Discord;
- automações críticas sem revisão;
- edição de qualquer arquivo arbitrário do projeto;
- publicação direta na branch principal.

## Segurança

Tokens do GitHub não devem ficar no front-end.

Operações de escrita em repositórios devem passar pelo back-end, com autenticação, validação e permissões controladas.

## Resultado esperado

Ao final dessa fase, administradores devem conseguir atualizar informações públicas dos projetos de forma visual, mas mantendo o GitHub como fonte de versionamento, revisão e histórico.
