class ContentDAO {
  constructor(db) {
    this.db = db;
  }

  getById = (idContent) => {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM CONTEUDOS WHERE ID = ?",
        idContent,
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

  postContentUser = (idUser, idContent, done) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO USUARIO_CONTEUDO VALUES(?, ?, ?, ?)",
        null,
        idUser,
        idContent,
        done,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Registro de conteudo inserido com sucesso!`,
              error: false,
            });
          }
        }
      );
    });
  };

  deleteContentUser = (idUser, idContent) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "DELETE FROM USUARIO_CONTEUDO WHERE USUARIO_ID = ? AND CONTEUDO_ID = ?",
        idUser,
        idContent,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Registro de usuario ${idUser} e conteudo ${idContent} removido com sucesso!`,
            });
          }
        }
      );
    });
  };

  getAllContentByTrailId = (idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT CONTEUDOS.ID, CONTEUDOS.TITULO, CONTEUDOS.TIPO, CONTEUDOS.DURACAO, CONTEUDOS.FONTE, CONTEUDOS.DESCRICAO, CONTEUDOS.TAG, CONTEUDOS.MODULO_ID FROM CONTEUDOS INNER JOIN MODULOS ON MODULOS.ID = MODULO_ID INNER JOIN TRILHAS ON TRILHA_ID = TRILHAS.ID WHERE TRILHAS.ID = ?",
        idTrail,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              conteudos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  _verifyId = async (idContent) => {
    const content = await this.getById(idContent);
    if (content.conteudo === undefined) {
      throw new Error(`Conteudo de id ${idContent} não encontrado.`);
    }

    return content;
  };
}

export default ContentDAO;
