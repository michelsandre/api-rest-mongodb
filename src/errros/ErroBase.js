class ErroBase extends Error {
  constructor(mensagem = "Erro interno do servidor", status = 500) {
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  enviarReposta(res, erro) {
    res.status(this.status).json({
      mensagem: this.mensagem,
      status: this.status,
    });
  }
}

export default ErroBase;
