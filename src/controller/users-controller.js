import UsersDAO from "../DAO/users-DAO.js";
import Users from "../model/Users.js";
import { validateBodyUser } from "../service/validateUsers.js";
import ErrStatus from "../model/Error.js";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { ensureAuthenticated } from "../middleware/ensureAuth.js";
import { genToken } from "../service/auth.js";
import jwt from "jsonwebtoken";

const usersController = (app, dbUsers) => {
  const usersDAO = new UsersDAO(dbUsers);

  app.get("/usuarios", ensureAuthenticated, async (req, res) => {
    try {
      res.status(200).json(await usersDAO.getAll());
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/usuarios/id/:id", ensureAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { ID } = jwt.decode(req.headers.authorization);
    console.log(id, ID);
    try {
      if (Number(id) === ID) {
        await usersDAO._verifyId(id);
        res.status(200).json(await usersDAO.getById(id));
      } else {
        throw new Error("Não autorizado");
      }
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/usuarios/email/:email", ensureAuthenticated, async (req, res) => {
    const email = req.params.email;
    try {
      await usersDAO._verifyEmail(email);
      res.status(201).json(await usersDAO.getByEmail(email));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get(
    "/usuarios/trilhaPorId/:id",
    ensureAuthenticated,
    async (req, res) => {
      const id = req.params.id;
      const { ID } = jwt.decode(req.headers.authorization);

      try {
        if (Number(id) === ID) {
          const user = await usersDAO._verifyId(id);
          const trails = await usersDAO.getTrailsByUserId(user.usuario.ID);
          res.status(200).json(trails);
        } else {
          throw new Error("Não autorizado");
        }
      } catch (e) {
        res.status(404).json({
          msg: e.message,
          error: true,
        });
      }
    }
  );

  app.post("/usuarios", async (req, res) => {
    const body = req.body;

    try {
      if (validateBodyUser(...Object.values(body))) {
        const newUser = new Users(...Object.values(body));

        if (await usersDAO._repeatedEmail(newUser.email)) {
          res.status(201).json(
            await usersDAO.postUser({
              nome_completo: newUser.nome_completo,
              email: newUser.email,
              senha: await hash(newUser.senha, 8),
              admin: newUser.admin,
            })
          );
        }
      }
    } catch (e) {
      res.status(404).json({
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
      if (senha !== login.usuario.SENHA) {
        const passMatch = await compare(senha, login.usuario.SENHA);
        if (!passMatch) {
          throw new ErrStatus(
            "Email ou senha inválido!",
            400,
            new Error("Email ou senha inválido!")
          );
        }
      }

      const token = genToken(login.usuario);

      res.status(200).json({
        auth: true,
        token: token,
        msg: `Usuario ${login.usuario.NOME_COMPLETO} logado!`,
        usuario: {
          ID: login.usuario.ID,
          NOME_COMPLETO: login.usuario.NOME_COMPLETO,
          EMAIL: login.usuario.EMAIL,
          ADMIN: login.usuario.ADMIN,
        },
      });
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.put("/usuarios/id/:id", ensureAuthenticated, async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const { ID } = jwt.decode(req.headers.authorization);

    try {
      if (Number(id) === ID) {
        if (validateBodyUser(...Object.values(body))) {
          const usuario = await usersDAO._verifyId(id);
          const userUpdated = new Users(...Object.values(body));
          if (usuario.usuario.EMAIL === userUpdated.email) {
            res.status(200).json(await usersDAO.putUser(id, userUpdated));
          } else if (usuario.usuario.EMAIL !== userUpdated.email) {
            const userExist = await usersDAO.getByEmail(userUpdated.email);
            if (userExist.usuario === undefined) {
              res.status(200).json(await usersDAO.putUser(id, userUpdated));
            } else {
              res
                .status(200)
                .json(
                  await usersDAO.putUser(id, {
                    NOME_COMPLETO: userUpdated.nome_completo,
                    EMAIL: usuario.usuario.EMAIL,
                    SENHA: userUpdated.senha,
                    ADMIN: userUpdated.admin,
                  })
                );
            }
          }
        }
      } else {
        throw new ErrStatus("Não autorizado", 401);
      }
    } catch (e) {
      res.status(e.status).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete("/usuarios/id/:id", ensureAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { ID } = jwt.decode(req.headers.authorization);

    try {
      if (Number(id) === ID) {
        await usersDAO._verifyId(id);
        res.status(200).json(await usersDAO.deleteUser(id));
      } else {
        throw new Error("Não autorizado");
      }
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default usersController;
