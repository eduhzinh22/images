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
      return res.json({ resultado: "Está Faltando Algum Parâmetro." });
    }

    const data = await Welcome(profile, number, nomegp, membercnt);

    return res.json({
      status: true,
      creator: "Lkzinha",
      resultado: data
    });

  } catch (e) {
    console.error(e);
    return res.json({
      status: false,
      resultado: "Error"
    });
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
