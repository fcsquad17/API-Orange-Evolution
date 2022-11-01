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
}
export default TrilhasDAO;
