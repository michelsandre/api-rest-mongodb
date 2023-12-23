import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve ser entre 10 e 5000",
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "ID do autor obrigatório"],
      autopopulate: true,
    },
  },
  { versionKey: false }
);

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;
