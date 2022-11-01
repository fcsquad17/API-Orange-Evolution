import TrilhasDAO from "../DAO/trilhas-DAO.js";

const trilhasController = (app, dbTrilhas) => {
  const trilhasDAO = new TrilhasDAO(dbTrilhas);

  app.get("/trilhas", async (req, res) => {
    try {
      res.json(await trilhasDAO.getAll());
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/trilhas/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await trilhasDAO._verifyId(id);
      const trilha = await trilhasDAO.getById(id);
      res.status(201).json(trilha);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });
};
