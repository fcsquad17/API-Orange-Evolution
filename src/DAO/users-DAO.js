import ErrStatus from "../model/Error.js";

class UsersDAO {
  constructor(dbUsers) {
    this.dbUsers = dbUsers;
  }

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
        "INSERT INTO USUARIOS VALUES(?, ?, ?, ?, ?, ?)",
        newUser.id,
        newUser.nome_completo,
        newUser.email,
        newUser.senha,
        newUser.id_trilhas,
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
        "UPDATE USUARIOS SET NOME_COMPLETO = ?, EMAIL = ?, SENHA = ?, ID_TRILHAS = ?, ADMIN = ? WHERE ID = ?",
        User.nome_completo,
        User.email,
        User.senha,
        User.id_trilhas,
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
