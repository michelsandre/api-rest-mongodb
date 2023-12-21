import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

// Metodo de embedding
// const livroSchema = new mongoose.Schema(
//   {
//     id: { type: mongoose.Schema.Types.ObjectId },
//     titulo: { type: String, required: true },
//     editora: { type: String },
//     preco: { type: Number },
//     paginas: { type: Number },
//     autor: autorSchema,
//   },
//   { versionKey: false }
// );

// Metodo de reference
const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "Título do livro obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
      min: [10, "Número de páginas deve estar entre 10 e 5000"],
      max: [5000, "Número de páginas deve estar entre 10 e 5000"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "ID do autor obrigatório"],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
