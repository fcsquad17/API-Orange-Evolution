import UsersDAO from "../DAO/users-DAO";

const hasAdmin = (app, dbUsers, admin) => {
  const userDAO = new UsersDAO(dbUsers);
  app.use(async (req, res, next) => {
    const body = req.body;
    const headers = req.headers;
    const user = await userDAO.getById(req.body.ID);
    if (!user || !admin.includes(user.admin)) {
      return res
        .status(403)
        .send({ error: { status: 403, msg: "Acesso negado." } });
    }
    next();
  });
};

export default hasAdmin;
