# Painel administrativo do YAHub

## Objetivo

O painel administrativo será a forma de manter os dados editoriais do YAHub sem editar arquivos manualmente.

Na V1, o painel deve ser simples e focado em cadastro e manutenção de projetos e membros.

## Papel na V1

O painel administrativo entra na V1 e deve ficar na mesma aplicação front-end do YAHub.

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
  -> escolhe entre repositório oficial ou projeto orientado
  -> seleciona um repositório público da YA LABS
     ou informa a URL pública de um repositório externo
  -> GitHub é consultado e o formulário recebe dados técnicos iniciais
  -> administrador completa os metadados editoriais
  -> back-end valida os dados
  -> back-end persiste no PostgreSQL
  -> portal público passa a consumir os dados atualizados
```

### Cadastro de projeto oficial

- listar automaticamente os repositórios públicos da organização `ya-labs`;
- permitir busca e filtros;
- ocultar arquivados e forks por padrão;
- indicar quais repositórios já estão cadastrados;
- definir `affiliation = oficial`;
- permitir escolher `category = produto` ou `category = ecossistema`.

### Cadastro de projeto orientado

- receber uma URL pública do GitHub;
- validar repositório, proprietário e duplicidade;
- rejeitar URL privada, inválida ou fora do GitHub;
- definir `affiliation = orientado`;
- definir `category = produto`;
- permitir informar autoria, tipos de apoio e mentores da YA LABS.

O vínculo não deve ser escolhido livremente. Se a URL pertencer à organização `ya-labs`, o cadastro deve seguir como projeto oficial.

## Acesso administrativo

O acesso administrativo entra na V1 com login e cadastro.

O back-end pode expor endpoints iniciais de autenticação, como `POST /api/login` e `POST /api/register`, seguindo o planejamento inicial do Caio.

Antes de produção, o cadastro precisa ser controlado. A V1 pode manter o endpoint de cadastro, mas não deve permitir criação pública aberta de administradores sem validação, convite, semente inicial ou outro controle equivalente.

## Responsabilidades

Front-end:

- telas administrativas;
- seleção e busca de repositórios da YA LABS;
- entrada de URL para projeto orientado;
- formulários;
- estados de validação e erro;
- experiência de edição.

Back-end:

- autenticação;
- consulta e validação de repositórios públicos no GitHub;
- prevenção de cadastro duplicado pelo identificador do repositório;
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
- repositórios privados;
- projetos sem repositório no GitHub;
- mais de um repositório principal por projeto;
- `.yahub/project.json` como fonte oficial.

## Segurança

Tokens e credenciais não devem ficar no front-end.

Operações administrativas devem passar pelo back-end, com autenticação, validação e permissões controladas.

## Resultado esperado

Ao final da V1, administradores devem conseguir atualizar projetos e membros de forma visual, mantendo o banco do YAHub como fonte oficial dos dados editoriais.
