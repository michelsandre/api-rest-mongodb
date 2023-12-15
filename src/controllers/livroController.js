import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado) {
        res.status(200).json(livroEncontrado);
      } else {
        res.status(404).json({ message: `Id do Livro não localizado` });
      }
    } catch (erro) {
      next(erro);
    }
  }

  //Usando metodo reference (comentado é o Embedding)
  static async cadastrarLivro(req, res, next) {
    // const novoLivro = req.body;
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "livro criado", livro: novoLivro });
      // const autorEncontrado = novoLivro.autor
      //   ? await autor.findById(novoLivro.autor)
      //   : "";
      // const livroCompleto = {
      //   ...novoLivro,
      //   autor: { ...autorEncontrado._doc },
      // };
      // const livroCriado = await livro.create(
      //   novoLivro.autor ? livroCompleto : novoLivro
      // );
      // res
      //   .status(201)
      //   .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivroPorId(req, res, next) {
    const editarLivro = req.body;
    try {
      const id = req.params.id;
      const autorEncontrado = editarLivro.autor
        ? await autor.findById(editarLivro.autor)
        : "";

      const livroCompleto = {
        ...editarLivro,
        autor: { ...autorEncontrado._doc },
      };
      await livro.findByIdAndUpdate(
        id,
        editarLivro.autor ? livroCompleto : editarLivro
      );
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async apagarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro apagado!" });
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    // Busca por "contém" utilizando expressão regular
    const editora = RegExp(req.query.editora, "i");

    try {
      const livrosPorEditora = await livro
        .find({ editora: editora })
        .populate("autor");
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
