# YAHub Web

Aplicação front-end da V1 do YAHub, construída com React, TypeScript e Vite.

## Requisitos

- Node.js
- npm

## Instalação

Na raiz do repositório:

```powershell
npm run winstall
```

## Execução local

```powershell
npm run wdev
```

## Variáveis de ambiente

Crie um arquivo `.env.development` em `apps/web`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Scripts

```powershell
npm run wlint
npm run wtest
npm run wbuild
```

## Rotas iniciais

### Home institucional

- `/`

### Portal público

- `/portal`
- `/portal/projetos`
- `/portal/projetos/:slug`
- `/portal/membros`
- `/portal/membros/:slug`
- `/portal/docs`
- `/portal/atividade`

### Área administrativa

- `/admin/login`
- `/admin`
- `/admin/projetos`
- `/admin/membros`

As páginas são carregadas sob demanda com `React.lazy` e exibem um fallback
enquanto o módulo da rota é carregado. As rotas administrativas estão agrupadas
no `AdminShell` e passam pelo `RequireAuth`; até a integração de autenticação,
o guard redireciona acessos para `/admin/login`.

## Estrutura inicial

```text
src/
|-- app/
|-- config/
|-- features/
|   |-- home/
|   |-- portal/
|   `-- admin/
|-- main.tsx
```
