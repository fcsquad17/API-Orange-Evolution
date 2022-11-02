import UsersDAO from "../DAO/users-DAO.js";

const usersController = (app, dbUsers) => {
  const usersDAO = new UsersDAO(dbUsers);

  app.get("/usuarios", async (req, res) => {
    try {
      res.status(200).json(await usersDAO.getAll());
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/usuarios/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await usersDAO._verifyId(id);
      const user = await usersDAO.getById(id);
      res.status(201).json(user);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/usuarios/email/:email", async (req, res) => {
    const email = req.params.email;
    try {
      await usersDAO._verifyEmail(email);
      const user = await usersDAO.getByEmail(email);
      res.status(201).json(user);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/usuarios", async (req, res) => {
    const body = req.body;
  });
};

export default usersController;
