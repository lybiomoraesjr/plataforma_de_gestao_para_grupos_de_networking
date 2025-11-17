## Pré-requisitos

- Node.js 18+
- Banco PostgreSQL acessível (local ou remoto)

## Configuração

1. Instale dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz com as variáveis mínimas:
   ```env
   DATABASE_NAME=SEU_BANCO
   DATABASE_USER=SEU_USUARIO
   DATABASE_PASSWORD=SUA_SENHA
   DATABASE_HOST=localhost
   DATABASE_PORT=5432

   ADMIN_ACCESS_KEY=minha-chave-secreta
   ```
   > O aplicativo não inicializa sem credenciais válidas de banco.
3. Garanta que o banco apontado em `DATABASE_NAME` já exista. O Sequelize cria apenas as tabelas; se o banco não estiver criado, a conexão falha imediatamente.

## Executando o projeto Next.js

- Ambiente de desenvolvimento:
  ```bash
  npm run dev
  ```
  Acesse `http://localhost:3000`.
- Página de administrador: adicione `?key=<valor ADMIN_ACCESS_KEY>` à URL para liberar o acesso, por exemplo `http://localhost:3000/admin/intentions?key=minha-chave-secreta`.
- Sempre que uma intenção for aprovada, o servidor exibirá no terminal o link de cadastro completo correspondente.

## Testes (Jest)

- Executar toda a suíte:
  ```bash
  npm test
  ```
- Ou rodar apenas um arquivo:
  ```bash
  npx jest src/app/__tests__/home-page.test.tsx
  ```

## Outras informações

- As instruções de arquitetura detalhadas estão documentadas em `ARQUITETURA.md`.
