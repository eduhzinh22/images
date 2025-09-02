const express = require("express");
const axios = require("axios");

const app = express();

// Rota inicial
app.get("/", (req, res) => {
  res.send("🚀 Meu site simples no Render/GitHub");
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
