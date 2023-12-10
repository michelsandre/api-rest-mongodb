import express from "express";
import conectaDB from "./config/dbConnect.js";
import routes from "./config/routes/index.js";

const conexao = await conectaDB();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com banco realizado com sucesso");
});

const app = express();
routes(app);

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  listaLivros.splice(index, 1);
  fs.writeFileSync("./src/livros.json", JSON.stringify(listaLivros));
  res.status(200).send("Registro apagado!");
});
export default app;
