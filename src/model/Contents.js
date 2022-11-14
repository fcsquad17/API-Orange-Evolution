class ContentsUsers {
  constructor(idUser, idContent, done) {
    this.idUser = idUser;
    this.idContent = idContent;
    this.done = done;
  }
}

class Contents {
  constructor(titulo, tipo, duracao, fonte, descricao, tag, moduloId) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.duracao = duracao;
    this.fonte = fonte;
    this.descricao = descricao;
    this.tag = tag;
    this.moduloId = moduloId;
  }
}

export { ContentsUsers, Contents };
