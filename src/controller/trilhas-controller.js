import TrilhasDAO from "../DAO/trilhas-DAO.js";
import Trails from "../model/Trails.js";
import { validateBodyTrail } from "../service/validateTrails.js";

const trilhasController = (app, dbTrilhas) => {
  const trilhasDAO = new TrilhasDAO(dbTrilhas);

  app.get("/trilhas", async (req, res) => {
    try {
      res.status(200).json(await trilhasDAO.getAll());
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
      res.status(201).json(await trilhasDAO.getById(id));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/trilhas", async (req, res) => {
    const body = req.body;

    try {
      if (validateBodyTrail(...Object.values(body))) {
        const newTrail = new Trails(...Object.values(body));
        res.status(201).json(await trilhasDAO.postTrail(newTrail));
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.put("/trilhas/id/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    try {
      if (validateBodyTrail(...Object.values(body))) {
        await trilhasDAO._verifyId(id);
        const updatedTrail = new Trails(...Object.values(body));
        res.status(200).json(await trilhasDAO.putTrail(id, updatedTrail));
      }
    } catch (e) {
      res.status(e.status).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete("/trilhas/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await trilhasDAO._verifyId(id);
      res.status(200).json(await trilhasDAO.deleteTrail(id));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default trilhasController;
