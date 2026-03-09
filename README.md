<div align="center">

# 🛒 Jitterbit API

*API REST para gerenciamento de pedidos.*

<img src="https://img.shields.io/github/last-commit/joschonarth/jitterbit-api?style=default&logo=git&logoColor=white&color=1b3e51&labelColor=27272a" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/joschonarth/jitterbit-api?style=default&color=f54614&labelColor=27272a" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/joschonarth/jitterbit-api?style=default&color=1b3e51&labelColor=27272a" alt="repo-language-count">
<img src="https://img.shields.io/github/actions/workflow/status/joschonarth/jitterbit-api/ci.yml?style=default&color=f54614&labelColor=27272a" alt="ci-tests">

---

📃 [Sobre](#-sobre)&nbsp;&nbsp;•&nbsp;&nbsp;
🛠️ [Tecnologias](#️-tecnologias)&nbsp;&nbsp;•&nbsp;&nbsp;
✨ [Funcionalidades](#-funcionalidades)&nbsp;&nbsp;•&nbsp;&nbsp;
🚀 [Como rodar](#-como-rodar)&nbsp;&nbsp;•&nbsp;&nbsp;
📖 [Documentação](#-documentação-da-api)&nbsp;&nbsp;•&nbsp;&nbsp;
🧪 [Testes](#-testes)

</div>

---

## 📃 Sobre

A **Jitterbit API** é uma API REST desenvolvida como parte do **Desafio Técnico da [Jitterbit](https://www.jitterbit.com/)**. O desafio consiste em criar uma API para gerenciamento de pedidos, permitindo criar, listar, buscar, atualizar e deletar pedidos com seus respectivos itens. A API realiza o mapeamento dos campos recebidos no formato português para o formato em inglês persistido no banco de dados. Conta com autenticação via **JWT** para proteger os endpoints e documentação interativa via **Swagger**. O backend é construído com **Node.js**, **Fastify** e **Prisma ORM**.

> ⚠️ O desafio originalmente solicita o uso de **JavaScript**, porém optei por desenvolver em **TypeScript** para demonstrar maior domínio da linguagem e garantir mais segurança e qualidade no código com tipagem estática.

---

## 🛠️ Tecnologias

- 🟢 **[Node.js](https://nodejs.org/)** — Ambiente de execução JavaScript server-side.
- ⚡ **[Fastify](https://fastify.dev/)** — Framework web focado em performance e baixo overhead.
- 🟦 **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática e segurança em tempo de desenvolvimento.
- 🔷 **[Prisma ORM](https://www.prisma.io/)** — ORM moderno e type-safe para TypeScript.
- 🐘 **[PostgreSQL](https://www.postgresql.org/)** — Banco de dados relacional robusto e confiável.
- 🐳 **[Docker](https://www.docker.com/)** — Containerização do banco de dados para ambiente reproduzível.
- 📖 **[Swagger](https://swagger.io/)** — Documentação interativa da API via `@fastify/swagger`.
- 🔐 **[JWT](https://jwt.io/)** — Autenticação stateless via `@fastify/jwt`.
- 🧪 **[Vitest](https://vitest.dev/)** — Framework de testes unitários e de integração.
- 🛡️ **[Zod](https://zod.dev/)** — Validação e parsing de schemas com inferência de tipos.
- 🔍 **[Biome](https://biomejs.dev/)** — Linting e formatação de código de alta performance.
- 🔄 **[GitHub Actions](https://github.com/features/actions)** — Integração contínua e automação do pipeline de testes.

---

## ✨ Funcionalidades

- [x] 📦 Criar um novo pedido com itens
- [x] 🔍 Buscar pedido por ID
- [x] 📋 Listar todos os pedidos com paginação
- [x] ✏️ Atualizar um pedido existente
- [x] 🗑️ Deletar um pedido
- [x] 🔁 Mapeamento automático dos campos (PT → EN)
- [x] 🔐 Autenticação com JWT
- [x] 🛡️ Validação de dados com Zod
- [x] 📖 Documentação interativa da API com Swagger
- [x] 🧪 Testes automatizados com Vitest
- [x] 🔄 Pipeline de CI rodando os testes a cada push

---

## 🚀 Como rodar

### 📋 Pré-requisitos

- 🟩 [Node.js 20+](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/)
- 🐳 [Docker](https://www.docker.com/)

### 🔧 Instalação

1. Clone o repositório:
```bash
    git clone https://github.com/joschonarth/jitterbit-api.git
```

2. Acesse a pasta do projeto:
```bash
    cd jitterbit-api
```

3. Instale as dependências:
```bash
    npm install
```

4. Configure as variáveis de ambiente copiando o arquivo de exemplo:
```bash
    cp .env.example .env
```

    Em seguida, abra o arquivo `.env` e preencha as variáveis:
```env
    # Node Environment
    NODE_ENV=development

    # Port
    PORT=3333

    # Database
    DATABASE_URL="postgresql://docker:docker@localhost:5432/jitterbit?schema=public"

    # Auth
    JWT_SECRET="your-secret-key"
    API_USERNAME="admin"
    API_PASSWORD="admin"
```

### 🐳 Banco de dados

Suba o container do PostgreSQL com Docker:
```bash
docker compose up -d
```

Gere o Prisma Client:
```bash
npx prisma generate
```

Execute as migrations para criar as tabelas:
```bash
npx prisma migrate deploy
```

### ▶️ Execução

Inicia o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em **[http://localhost:3333](http://localhost:3333)**.

---

## 📖 Documentação da API

Com o servidor rodando, acesse a documentação interativa gerada pelo Swagger:

**[http://localhost:3333/docs](http://localhost:3333/docs)**

### 🔐 Autenticação

Todos os endpoints de pedidos exigem autenticação. Para obter o token, faça uma requisição para o endpoint de autenticação:
```bash
curl --location 'http://localhost:3333/auth' \
--header 'Content-Type: application/json' \
--data '{
  "username": "admin",
  "password": "admin"
}'
```

Utilize o token retornado no header `Authorization` das requisições:
```
Authorization: Bearer <token>
```

### 📦 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth` | Autenticar e obter token JWT |
| `POST` | `/order` | Criar um novo pedido |
| `GET` | `/order/:orderId` | Buscar pedido por ID |
| `GET` | `/order/list` | Listar todos os pedidos |
| `PUT` | `/order/:orderId` | Atualizar um pedido |
| `DELETE` | `/order/:orderId` | Deletar um pedido |

---

## 🧪 Testes

Os testes são escritos com **Vitest** e cobrem os principais fluxos e regras de negócio da aplicação.
```bash
# Roda todos os testes
npm test

# Roda os testes em watch mode
npm run test:watch
```

---

## ⚙️ CI

O projeto conta com um workflow de **Integração Contínua** via **GitHub Actions**. A cada `push`, o pipeline é acionado automaticamente e executa todos os testes para garantir que nenhuma funcionalidade foi quebrada.
```txt
.github/
└── workflows/
    └── ci.yml
```

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ♥ por **[João Otávio Schonarth](https://github.com/joschonarth)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/joschonarth)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)

</div>