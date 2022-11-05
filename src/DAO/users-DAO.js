import ErrStatus from "../model/Error.js";

class UsersDAO {
  constructor(dbUsers) {
    this.dbUsers = dbUsers;
  }

  activeForeignKeys = async () => {
    const query = "PRAGMA foreign_keys = ON";

    await this.dbUsers.run(query, (error) => {
      if (error) console.log(error.message);
      else console.log("Chaves estrangeiras ativadas com sucesso.");
    });
  };

  getAll = () => {
    return new Promise((resolve, reject) => {
      this.dbUsers.all("SELECT * FROM USUARIOS", (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            usuarios: rows,
            error: false,
          });
        }
      });
    });
  };

  getById = (id) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.get(
        "SELECT * FROM USUARIOS WHERE ID = ?",
        id,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              usuario: row,
              error: false,
            });
          }
        }
      );
    });
  };

  getByEmail = (email) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.get(
        "SELECT * FROM USUARIOS WHERE EMAIL = ?",
        email,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              usuario: row,
              error: false,
            });
          }
        }
      );
    });
  };

  postUser = (newUser) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.run(
        "INSERT INTO USUARIOS VALUES(?, ?, ?, ?, ?)",
        newUser.id,
        newUser.nome_completo,
        newUser.email,
        newUser.senha,
        newUser.admin,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Usuario ${newUser.nome_completo} criado com sucesso!`,
              usuario: newUser,
              error: false,
            });
          }
        }
      );
    });
  };

  deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.run("DELETE FROM USUARIOS WHERE ID = ?", id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            usuario: `Usuario de id ${id} deletado com sucesso!`,
            error: false,
          });
        }
      });
    });
  };

  putUser = (id, User) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.run(
        "UPDATE USUARIOS SET NOME_COMPLETO = ?, EMAIL = ?, SENHA = ?, ADMIN = ? WHERE ID = ?",
        User.nome_completo,
        User.email,
        User.senha,
        User.admin,
        id,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              msg: `Usuario de id ${id} atualizado com sucesso!`,
              usuario: User,
              error: false,
            });
          }
        }
      );
    });
  };

  getTrailsByUserId = (idUser) => {
    return new Promise((resolve, reject) => {
      this.dbUsers.all(
        "SELECT TRILHAS.TITULO, TRILHAS.ID FROM TRILHAS INNER JOIN MODULOS ON MODULOS.TRILHA_ID = TRILHAS.ID INNER JOIN CONTEUDOS ON CONTEUDOS.MODULO_ID = MODULOS.ID INNER JOIN USUARIO_CONTEUDO ON CONTEUDOS.ID = USUARIO_CONTEUDO.CONTEUDO_ID WHERE USUARIO_CONTEUDO.USUARIO_ID = ? GROUP BY TRILHAS.TITULO",
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

  _verifyId = async (id) => {
    const usuario = await this.getById(id);
    if (usuario.usuario === undefined) {
      throw new Error(`Usuario de id ${id} não encontrado.`);
    }
    return usuario;
  };

  _verifyEmail = async (email) => {
    const usuario = await this.getByEmail(email);
    if (usuario.usuario === undefined) {
      throw new ErrStatus(
        `Usuario de email ${email} não encontrado.`,
        404,
        new Error(`Usuario de email ${email} não encontrado.`)
      );
    }
    return usuario;
  };

  _repeatedEmail = async (email) => {
    const usuario = await this.getByEmail(email);
    if (usuario.usuario === undefined) {
      return true;
    } else {
      throw new Error(`Email já está cadastrado.`);
    }
  };
}
export default UsersDAO;
