import NaoEncontrado from "../errros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find();
      req.resultado = listaAutores;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;

      const autorResultado = await autor.findByIdAndUpdate(id, req.body);

      if (autorResultado) {
        res.status(200).json({ mensagem: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("ID do Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async apagarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);
      if (autorResultado) {
        res.status(200).json({ message: "Autor apagado!" });
      } else {
        next(new NaoEncontrado("ID do Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
