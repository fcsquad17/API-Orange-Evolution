import UsersDAO from "../DAO/users-DAO.js";
import Users from "../model/Users.js";
import validate from "../service/validate.js";
import ErrStatus from "../model/Error.js";

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

  app.get("/usuarios/trilhaPorId/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await usersDAO._verifyId(id);
      const trails = await usersDAO.getTrailsByUserId(id);
      res.status(201).json(trails);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/usuarios", async (req, res) => {
    const body = req.body;

    try {
      console.log(...Object.values(body));
      if (validate(...Object.values(body))) {
        const newUser = new Users(...Object.values(body));
        if (await usersDAO._repeatedEmail(newUser.email)) {
          res.status(201).json(await usersDAO.postUser(newUser));
        }
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.put("/usuarios/id/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      if (validate(...Object.values(body))) {
        await usersDAO._verifyId(id);
        const userUpdated = new Users(...Object.values(body));
        const updateUser = await usersDAO.putUser(id, userUpdated);
        res.status(200).json(updateUser);
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete("/usuarios/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await usersDAO._verifyId(id);
      const deleteUser = await usersDAO.deleteUser(id);
      res.status(201).json(deleteUser);
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/usuarios/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
      await usersDAO._verifyEmail(email);
      const login = await usersDAO.getByEmail(email);
      if (email !== login.usuario.EMAIL || senha !== login.usuario.SENHA) {
        throw new ErrStatus(
          "Email ou senha inválido!",
          400,
          new Error("Email ou senha inválido!")
        );
      }
      res.status(200).json({
        usuario: login.usuario,
        msg: `Usuario ${login.usuario.NOME_COMPLETO} logado!`,
      });
    } catch (e) {
      res.status(e.status).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default usersController;
