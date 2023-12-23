import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncontrado from "../errros/NaoEncontrado.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
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
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  //Usando metodo reference (comentado é o Embedding)
  static async cadastrarLivro(req, res, next) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "livro criado", livro: novoLivro });
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

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosPorFiltro = livro.find(busca);
        req.resultado = livrosPorFiltro;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const {
    titulo,
    editora,
    minPaginas,
    maxPaginas,
    minPreco,
    maxPreco,
    nomeAutor,
  } = parametros;

  let busca = {};

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (minPaginas) busca.paginas = { $gte: minPaginas };
  if (maxPaginas) busca.paginas = { $lte: maxPaginas };
  if (minPaginas && maxPaginas)
    busca.paginas = { $gte: minPaginas, $lte: maxPaginas };
  if (minPreco) busca.preco = { $gte: minPreco };
  if (maxPreco) busca.preco = { $lte: maxPreco };
  if (minPreco && maxPreco) busca.preco = { $gte: minPreco, $lte: maxPreco };

  if (nomeAutor) {
    const buscaAutor = await autor.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });

    if (buscaAutor !== null) {
      busca.autor = buscaAutor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}
export default LivroController;
