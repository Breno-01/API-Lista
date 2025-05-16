const express = require('express');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const db = new sqlite3.Database('./banco_de_dados.db', (err) => {
if (err) {
console.error(err.message);
}
console.log('Conectado ao banco de dados SQLite.');
});
db.run(`CREATE TABLE IF NOT EXISTS Alunos (
id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT NOT NULL)`, (err) => {
if (err) {
console.error(err.message);
}
console.log('Tabela Alunos criada.');
});
app.get('/', (req, res) => {
res.send('API funcionando!');
});
app.get('/alunos', (req, res) => {
const sql = 'SELECT * FROM Alunos';
db.all(sql, [], (err, rows) => {
if (err) {
res.status(500).json({ error: err.message });
return;
}
res.json(rows);
});
});

app.post('/alunos', (req, res) => {
const { nome } = req.body;
const sql = 'INSERT INTO Alunos (nome) VALUES (?)';
db.run(sql, [nome], (err) => {
if (err) {
res.status(500).json({ error: err.message });
return;
}
res.json({ message: 'Aluno criado com sucesso!' });
});
});

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});

app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Alunos WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Aluno deletado com sucesso!' });
  });
});