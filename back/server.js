const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Endpoint para calcular o hash SHA256 do arquivo CSV
app.get('/hash-csv', (req, res) => {
  const filePath = '../dados.csv'; // Caminho para o arquivo CSV

  // Verifica se o arquivo existe
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    const hashResult = hash.digest('hex');
    res.json({ hash_sha256: hashResult });
  } else {
    res.status(404).json({ error: 'Arquivo CSV não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


console.log('Recebida uma requisição para /hash-csv');
