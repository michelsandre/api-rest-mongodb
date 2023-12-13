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

export default app;
