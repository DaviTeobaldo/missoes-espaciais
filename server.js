const express = require('express');
const path = require('path');
const missionRoutes = require('./src/routes/missionRoutes');
const db = require('./src/database/db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(missionRoutes);

// Inicialização do banco de dados
db.serialize(() => {
    console.log('Banco de dados inicializado com sucesso!');
});

// Inicialização do servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});