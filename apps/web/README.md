# YA Hub Web

Aplicação front-end da V1 do YA Hub, construída com React, TypeScript e Vite.

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