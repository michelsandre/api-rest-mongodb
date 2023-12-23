import mongoose from "mongoose";
import ErroBase from "../errros/ErroBase.js";
import ErroValidacao from "../errros/ErroValidacao.js";
import RequisicaoIncorreta from "../errros/RequisicaoIncorreta.js";

function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarReposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarReposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarReposta(res);
  } else {
    new ErroBase().enviarReposta(res);
  }
}

export default manipuladorDeErros;
