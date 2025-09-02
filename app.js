const express = require("express");
const axios = require("axios");

const app = express();

const { Play, Welcome } = require('./banner.js')

// Rota inicial
app.get("/", (req, res) => {
  res.json({resultado: "Estou Online"});
});

app.get('/lk/api/canvas/welcome', async (req, res) => {
  try {
    const { profile, number, nomegp, membercnt } = req.query;

    if (!profile || !number || !nomegp || !membercnt) {
      return res.status(400).send("Está faltando algum parâmetro.");
    }

    const imageUrl = await Welcome(profile, number, nomegp, membercnt);

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    res.set('Content-Type', 'image/png'); // ou image/jpeg dependendo do conteúdo
    res.send(Buffer.from(response.data));

  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao gerar imagem.");
  }
});

// Exemplo de rota que chama uma API externa com Axios
app.get("/api/dados", async (req, res) => {
  try {
    const resposta = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar dados" });
  }
});

// Porta dinâmica (necessário no Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
