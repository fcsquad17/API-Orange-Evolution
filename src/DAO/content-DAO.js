class ContentDAO {
  constructor(db) {
    this.db = db;
  }

  getFirstContent = (idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT CONTEUDOS.ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULO_ID = MODULOS.ID INNER JOIN TRILHAS ON TRILHAS.ID = MODULOS.TRILHA_ID WHERE TRILHAS.ID = ? LIMIT 1",
        idTrail,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudo: row,
              error: false,
            });
          }
        }
      );
    });
  };

  //   postOneTrailUser = (idTrail, idUser) => {
  //     return new Promise((resolve, reject) => {
  //       this.db.run(
  //         "SELECT * FROM (SELECT ) INSERT INTO CONTEUDO_USUARIO VALUES(?, ?, ?, ?)"
  //       );
  //     });
  //   };

  _verifyIdTrail = async (idTrail) => {
    const trail = await this.getFirstContent(idTrail);
    if (trail.conteudo === undefined) {
      throw new Error(`Trilha de id ${idTrail} não encontrada`);
    } else {
      return trail;
    }
  };
}

export default ContentDAO;
