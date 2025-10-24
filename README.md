# 🛡️ Backend API com Autenticação JWT

Este projeto é uma API RESTful desenvolvida com **Node.js**, **Express** e **MongoDB**, utilizando **Mongo Express** para visualização do banco de dados e autenticação de usuários via **JWT (JSON Web Token)**.

---

## ✅ Funcionalidades

### 🔓 Rotas Públicas
- `POST /users/register` - Cria um novo usuário com nome, e-mail e senha criptografada.
- `POST /users/login` - Autentica um usuário e retorna um token JWT.

### 🔐 Rotas Protegidas
- `GET /protected` - Retorna mensagem de sucesso apenas se o token JWT for válido no header `Authorization`.

---
## Lista de Tarefas (to-do-list):

A aplicação Back-end é utilizada como uma lista de tarefas para o usuário.
Cada tarefa terá:

-> title (string, obrigatório)

-> description (string, opcional)

-> completed (boolean, padrão: false)

-> createdAt (data, padrão: agora)

-> userId (referência ao usuário que criou)

## 🧪 Scripts de Teste (requests/)

A pasta `requests/` contém scripts `.sh` com exemplos de:

- Registro bem-sucedido
- Registro com erro (e-mail inválido, senha fraca, e-mail repetido, mal formatado)
- Login bem-sucedido
- Login com erro (credenciais erradas, e-mail inválido, mal formatado)
- Acesso com token válido
- Acesso sem token ou com token inválido

Execute um script com:

bash
source requests/auth/POST_Login_Success.sh

---
## Utilização:

Instale as dependência com:
npm install

Inicie a aplicação com:
npm run start:app
