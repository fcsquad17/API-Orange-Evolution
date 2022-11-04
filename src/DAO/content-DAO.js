class ContentDAO {
  constructor(db) {
    this.db = db;
  }

  getTrailsByUserId = (idUser) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT TRILHAS.TITULO FROM TRILHAS INNER JOIN MODULOS ON MODULOS.TRILHAS_ID = TRILHAS.ID INNER JOIN CONTEUDO ON CONTEUDO.MODULO_ID = MODULOS.ID INNER JOIN USUARIO_CONTEUDO ON CONTEUDO.ID = USUARIO_CONTEUDO.CONTEUDO_ID WHERE USUARIO.ID = ?",
        idUser,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              trilhas: rows,
              error: false,
            });
          }
        }
      );
    });
  };
}
