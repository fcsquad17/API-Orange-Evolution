import ErrStatus from "../model/Error.js";

class ModulesDAO {
  constructor(db) {
    this.db = db;
  }

  getAll = () => {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM MODULOS", (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            modulos: rows,
            error: false,
          });
        }
      });
    });
  };

  getById = (id) => {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM MODULOS WHERE ID = ?", id, (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            modulo: row,
            error: false,
          });
        }
      });
    });
  };

  getByIdTrail = (idTrail) => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT MODULOS.ID, MODULOS.TITULO, MODULOS.DESCRICAO, MODULOS.TRILHA_ID FROM MODULOS INNER JOIN TRILHAS ON TRILHAS.ID = MODULOS.TRILHA_ID WHERE TRILHAS.ID = ?",
        idTrail,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              modulos: rows,
              error: false,
            });
          }
        }
      );
    });
  };

  postModule = (newModule) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO MODULOS VALUES(?, ?, ?, ?)",
        null,
        newModule.titulo,
        newModule.descricao,
        newModule.trilha_id,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: "Modulo criado com sucesso!",
              error: false,
            });
          }
        }
      );
    });
  };

  putModule = (id, module) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE MODULOS SET TITULO = ?, DESCRICAO = ?, TRILHA_ID = ? WHERE ID = ?",
        module.titulo,
        module.descricao,
        module.trilhaId,
        id,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Modulo de id ${id} atualizado com sucesso!`,
              modulo: module,
              error: false,
            });
          }
        }
      );
    });
  };

  deleteModule = (id) => {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM MODULOS WHERE ID = ?", id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            msg: `Modulo de id ${id} deletado com sucesso!`,
            error: false,
          });
        }
      });
    });
  };

  _verifyId = async (id) => {
    const modulo = await this.getById(id);
    if (modulo.modulo === undefined) {
      throw new ErrStatus(`Modulo de id ${id} não encontrado.`, 404);
    }
    return modulo;
  };
}

export default ModulesDAO;
