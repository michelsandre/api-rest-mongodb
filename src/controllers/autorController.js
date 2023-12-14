import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});

      res.status(200).json(listaAutores);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado) {
        res.status(200).json(autorEncontrado);
      } else {
        res.status(404).json({ message: `Id do Autor não localizado` });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do Autor` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização do autor` });
    }
  }

  static async apagarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor apagado!" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao apagar o autor` });
    }
  }
}

export default AutorController;
