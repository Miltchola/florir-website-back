
-----

# Florir Website - Backend

Este é o servidor backend oficial do site Florir, construído com Node.js, Express e MongoDB.

Ele gerencia toda a lógica de negócios, o banco de dados e a autenticação, incluindo o cadastro de produtos e o upload de imagens para o Cloudflare R2.

-----

## Funcionalidades

  * **API RESTful:** Construída com Express.js.
  * **Banco de Dados:** Utiliza MongoDB com Mongoose para modelagem de dados.
  * **Autenticação:** Rotas seguras apenas para administradores, usando JSON Web Tokens (JWT).
  * **Armazenamento de Imagens:** Integração com **Cloudflare R2** para upload e exibição de imagens com alta performance.
  * **Documentação da API:** Inclui Swagger UI para facilitar os testes dos endpoints.

-----

## Como Começar

Siga estas instruções para obter uma cópia local funcionando para desenvolvimento e testes.

### Pré-requisitos

  * [Node.js](https://nodejs.org/) (v18 ou mais recente)
  * [Docker](https://www.docker.com/) (para rodar o banco de dados MongoDB localmente)

### Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/florir-website-back.git
    cd florir-website-back
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e copie o conteúdo do `.env.example` (ou a estrutura abaixo) para ele.

    ```bash
    cp .env.example .env
    ```

    Em seguida, preencha suas credenciais locais e do Cloudflare.

4.  **Inicie o banco de dados local:**
    Este comando usa o `docker compose` para iniciar um contêiner MongoDB.

    ```bash
    npm run start:database
    ```

5.  **Rode o servidor:**
    Este comando inicia o servidor em modo de desenvolvimento usando o `nodemon`.

    ```bash
    npm run start:app
    ```

Seu servidor agora deve estar rodando em `http://localhost:8080`.

-----

## Variáveis de Ambiente

Seu arquivo `.env` deve ser configurado para que a aplicação funcione.

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `PORT` | A porta em que o servidor Express irá rodar. | `8080` |
| `MONGO_URI` | String de conexão para seu banco MongoDB. | `mongodb://root:example@localhost:27017` |
| `MONGO_DB_NAME`| O nome do banco de dados a ser usado. | `florir_local` |
| `JWT_SECRET` | Uma string longa e aleatória para assinar JWTs. | `abc1234...` |
| `CORS_ORIGINS` | Lista de URLs de frontend permitidas (separadas por vírgula). | `http://localhost:3000,https://seu-front.vercel.app` |
| `R2_ACCOUNT_ID` | Seu ID de Conta do Cloudflare. | `...` |
| `R2_ACCESS_KEY_ID`| A Chave de Acesso (Access Key) do seu token R2. | `...` |
| `R2_SECRET_ACCESS_KEY`| A Chave Secreta (Secret Key) do seu token R2. | `...` |
| `R2_BUCKET_NAME`| O nome do seu bucket R2. | `florir-uploads` |
| `R2_PUBLIC_DOMAIN`| O domínio público conectado ao seu bucket R2. | `https://media.seu-site.com` |

-----

## Documentação da API

Este projeto usa Swagger para documentação da API. Assim que o servidor estiver rodando, você pode acessar a documentação interativa em:

**[http://localhost:8080/docs](https://www.google.com/search?q=http://localhost:8080/docs)**
