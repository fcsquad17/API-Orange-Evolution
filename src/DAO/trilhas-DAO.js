import ErrStatus from "../model/Error.js";

class TrilhasDAO {
  constructor(dbTrilhas) {
    this.dbTrilhas = dbTrilhas;
  }

  getAll = () => {
    return new Promise((resolve, reject) => {
      this.dbTrilhas.all("SELECT * FROM TRILHAS", (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            trilhas: rows,
            error: false,
          });
        }
      });
    });
  };

  getById = (id) => {
    return new Promise((resolve, reject) => {
      this.dbTrilhas.get(
        "SELECT * FROM TRILHAS WHERE ID = ?",
        id,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              trilha: row,
              error: false,
            });
          }
        }
      );
    });
  };

  postTrail = (newTrail) => {
    return new Promise((resolve, reject) => {
      this.dbTrilhas.run(
        "INSERT INTO TRILHAS VALUES(?, ?, ?)",
        null,
        newTrail.titulo,
        newTrail.descricao,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: "Trilha criada com sucesso!",
              trilha: newTrail,
              error: true,
            });
          }
        }
      );
    });
  };

  putTrail = (id, trail) => {
    return new Promise((resolve, reject) => {
      this.dbTrilhas.run(
        "UPDATE TRILHAS SET TITULO = ?, DESCRICAO = ? WHERE ID = ?",
        trail.titulo,
        trail.descricao,
        id,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Trilha de id ${id} atualizado com sucesso!`,
              trilha: trail,
              error: false,
            });
          }
        }
      );
    });
  };

  deleteTrail = (id) => {
    return new Promise((resolve, reject) => {
      this.dbTrilhas.run("DELETE FROM TRILHAS WHERE ID = ?", id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            msg: `Trilha de id ${id} deletado com sucesso!`,
            error: false,
          });
        }
      });
    });
  };

  _verifyId = async (id) => {
    const trilha = await this.getById(id);
    if (trilha.trilha === undefined) {
      throw new ErrStatus(`Trilha de id ${id} não encontrado.`, 404);
    }
    return trilha;
  };
}
export default TrilhasDAO;
