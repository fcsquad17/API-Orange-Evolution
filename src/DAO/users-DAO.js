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

  _verifyId = async (id) => {
    const usuario = await this.getById(id);
    if (usuario.usuario === undefined) {
      throw new Error(`Usuario de id ${id} não encontrado.`);
    }
    return usuario;
  };

  _verifyEmail = async (email) => {
    const usuario = await this.getById(email);
    if (usuario.usuario === undefined) {
      throw new Error(`Usuario de email ${email} não encontrado.`);
    }
    return usuario;
  };
}
export default UsersDAO;
