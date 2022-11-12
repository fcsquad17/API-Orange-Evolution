import Modules from "../model/Modules.js";
import ModulesDAO from "../DAO/modules-DAO.js";
import { validateBodyModule } from "../service/validateModules.js";
import { validateTrailId } from "../service/validateTrails.js";

const modulesController = (app, db) => {
  const modulesDAO = new ModulesDAO(db);

  app.get("/modulos", async (req, res) => {
    try {
      res.status(200).json(await modulesDAO.getAll());
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/modulos/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await modulesDAO._verifyId(id);
      res.status(200).json(await modulesDAO.getById(id));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/modulos/porIdTrilha/:idTrail", async (req, res) => {
    const idTrail = req.params.idTrail;

    try {
      await validateTrailId(idTrail);
      res.status(200).json(await modulesDAO.getByIdTrail(idTrail));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/modulos", async (req, res) => {
    const body = req.body;

    try {
      if (validateBodyModule(...Object.values(body))) {
        const newModule = new Modules(...Object.values(body));
        res.status(201).json(await modulesDAO.postModule(newModule));
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.put("/modulos/id/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      if (validateBodyModule(...Object.values(body))) {
        await modulesDAO._verifyId(id);
        const moduleUpdated = new Modules(...Object.values(body));
        res.status(200).json(await modulesDAO.putModule(id, moduleUpdated));
      }
    } catch (e) {
      res.status(e.status).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete("/modulos/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await modulesDAO._verifyId(id);
      res.status(200).json(await modulesDAO.deleteModule(id));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default modulesController;
