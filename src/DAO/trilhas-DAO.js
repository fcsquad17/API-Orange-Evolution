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

  _verifyId = async (id) => {
    const trilha = await this.getById(id);
    if (trilha.id === undefined) {
      throw new Error(`Trilha de id ${id} não encontrado.`);
    }
    return trilha;
  };
}
export default TrilhasDAO;
