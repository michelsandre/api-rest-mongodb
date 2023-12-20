import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`Houve um erro de validação de dados - ${mensagensErro}`);
  }
}

export default ErroValidacao;
