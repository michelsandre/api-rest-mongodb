import mongoose from "mongoose";

function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).json({
      message: `Um ou mais dados fornecidos estão incorretos - ${erro.message}`,
    });
  } else {
    res
      .status(500)
      .json({ message: `Erro interno do servidor - ${erro.message}` });
  }
}

export default manipuladorDeErros;
