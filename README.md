# 7 Days of Code - Missões Espaciais

Projeto CRUD em Node.js com Express e SQLite para gerenciar missões espaciais.

## Estrutura do projeto

- `server.js` - servidor Express e configuração de rotas
- `src/database/db.js` - configuração do banco de dados SQLite
- `src/models/missionModel.js` - funções de acesso a dados (Create, Read, Update, Delete)
- `src/controllers/missionController.js` - lógica de controle das rotas
- `src/routes/missionRoutes.js` - rotas da API
- `public/` - frontend estático que consome a API
  - `index.html`
  - `styles.css`
  - `app.js`
- `package.json` - dependências e scripts do projeto
- `space_missions.db` - banco de dados SQLite gerado localmente

## Instalação

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar

Para iniciar o servidor em modo de desenvolvimento com reinício automático:

```bash
npm run dev
```

Para executar normalmente:

```bash
npm start
```

## Acessando o frontend

Abra no navegador:

```bash
http://localhost:3000
```

## API Endpoints

- `POST /missions`
  - Cria uma nova missão espacial.
  - Body JSON esperado:
    ```json
    {
      "name": "Missão Lua Azul",
      "crew": "Equipe A",
      "spacecraft": "Apollo 11",
      "destination": "Lua",
      "status": "Planejada",
      "duration": "10 dias"
    }
    ```

- `GET /missions`
  - Retorna todas as missões.

- `GET /missions/:id`
  - Retorna uma missão pelo `id`.

- `PUT /missions/:id`
  - Atualiza uma missão existente.
  - Body JSON igual ao de criação.

- `DELETE /missions/:id`
  - Remove uma missão existente.

## Testes

Use o Postman ou o frontend integrado para testar todas as operações CRUD:

1. Criar nova missão com `POST /missions`
2. Listar missões com `GET /missions`
3. Buscar missão por ID com `GET /missions/:id`
4. Atualizar missão com `PUT /missions/:id`
5. Deletar missão com `DELETE /missions/:id`

## Observações

- O banco de dados SQLite é salvo no arquivo `space_missions.db`.
- O frontend estático consome as rotas da API usando `fetch` em `public/app.js`.
- Caso queira resetar o banco, remova o arquivo `space_missions.db` e reinicie o servidor.
