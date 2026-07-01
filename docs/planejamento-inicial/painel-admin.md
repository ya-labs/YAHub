# Painel administrativo do YA Hub

## Objetivo

O painel administrativo será a forma de manter os dados editoriais do YA Hub sem editar arquivos manualmente.

Na V1, o painel deve ser simples e focado em cadastro e manutenção de projetos e membros.

## Papel na V1

O painel administrativo entra na V1 e deve ficar na mesma aplicação front-end do YA Hub.

Ele não deve ser um repositório separado e não precisa nascer como um CMS completo.

Rotas conceituais:

```text
/admin
/admin/projetos
/admin/projetos/novo
/admin/projetos/:id
/admin/membros
/admin/membros/novo
/admin/membros/:id
```

## Fluxo inicial

```text
Admin acessa o painel
  -> autentica
  -> cadastra ou edita projetos e membros
  -> back-end valida os dados
  -> back-end persiste no PostgreSQL
  -> portal público passa a consumir os dados atualizados
```

## Acesso administrativo

O acesso administrativo entra na V1 com login e cadastro.

O back-end pode expor endpoints iniciais de autenticação, como `POST /api/login` e `POST /api/register`, seguindo o planejamento inicial do Caio.

Antes de produção, o cadastro precisa ser controlado. A V1 pode manter o endpoint de cadastro, mas não deve permitir criação pública aberta de administradores sem validação, convite, semente inicial ou outro controle equivalente.

## Responsabilidades

Front-end:

- telas administrativas;
- formulários;
- estados de validação e erro;
- experiência de edição.

Back-end:

- autenticação;
- persistência no PostgreSQL;
- validação dos dados;
- proteção de endpoints administrativos.

Plataforma:

- hospedagem;
- variáveis de ambiente;
- configuração segura de tokens;
- observabilidade e suporte ao deploy.

## Limites da V1

Ficam fora da V1:

- upload de imagens;
- permissões granulares;
- editor rico avançado;
- workflow de aprovação;
- criação automática de branch;
- abertura automática de Pull Request;
- edição de arquivos em repositórios externos;
- `.yahub/project.json` como fonte oficial.

## Segurança

Tokens e credenciais não devem ficar no front-end.

Operações administrativas devem passar pelo back-end, com autenticação, validação e permissões controladas.

## Resultado esperado

Ao final da V1, administradores devem conseguir atualizar projetos e membros de forma visual, mantendo o banco do YA Hub como fonte oficial dos dados editoriais.
