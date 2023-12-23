import express from "express";
import LivroController from "../../controllers/livroController.js";
import paginar from "../../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros/", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivroPorId);
routes.delete("/livros/:id", LivroController.apagarLivroPorId);

export default routes;
