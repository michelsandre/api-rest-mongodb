import express from "express";
import fs from "fs";

const file = fs.readFileSync("./src/livros.json");
const listaLivros = JSON.parse(file);

const app = express();
app.use(express.json());

// const livros = [
//   {
//     id: 1,
//     titulo: "O senhor dos aneis",
//   },
//   {
//     id: 2,
//     titulo: "O senhor da guerra",
//   },
// ];

function buscaLivros(id) {
  return livros.findIndex((livro) => {
    return livro.id === Number(id);
  });
}

app.get("/", (req, res) => {
  res.status(200).send("Curso de Nodejs");
});

app.get("/livros", (req, res) => {
  res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  res.status(200).json(listaLivros[index]);
});

app.post("/livros", (req, res) => {
  //   livros.push(req.body);
  listaLivros.push(req.body);
  fs.writeFileSync("./src/livros.json", JSON.stringify(listaLivros));

  res.status(201).send("Livro cadastrado");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  listaLivros[index].titulo = req.body.titulo;
  fs.writeFileSync("./src/livros.json", JSON.stringify(listaLivros));
  res.status(200).json(listaLivros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  listaLivros.splice(index, 1);
  fs.writeFileSync("./src/livros.json", JSON.stringify(listaLivros));
  res.status(200).send("Registro apagado!");
});
export default app;
