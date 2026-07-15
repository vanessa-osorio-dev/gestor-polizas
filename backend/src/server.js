
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const router = require('./router');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;



const db = new Database(
    path.join(__dirname, '../database/prueba.db')
);

// Importar rutas

app.use(router(db));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



