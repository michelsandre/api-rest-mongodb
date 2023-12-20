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
    titulo: { type: String, required: [true, "Título do livro obrigatório"] },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
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
