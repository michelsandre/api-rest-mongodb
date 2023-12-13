import express from "express";
import conectaDB from "./src/config/dbConnect.js";
import routes from "./src/config/routes/index.js";
import "dotenv/config";

const conexao = await conectaDB();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com banco realizado com sucesso");
});

const app = express();
routes(app);

//Novo implementacao
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on locahost:${PORT}`);
});

export default app;
