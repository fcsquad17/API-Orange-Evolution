import ContentDAO from "../DAO/content-DAO.js";
import { ContentsUsers, Contents } from "../model/Contents.js";
import { validateTrailId } from "../service/validateTrails.js";
import { validateUserId } from "../service/validateUsers.js";
import { validateModuleId } from "../service/validateModules.js";
import validateBodyContent from "../service/validateContents.js";
import ErrStatus from "../model/Error.js";

const contentController = (app, db) => {
  const contentDAO = new ContentDAO(db);

  app.get("/conteudos/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const content = await contentDAO._verifyId(id);
      res.status(200).json(content);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/conteudos/idTrilha/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await validateTrailId(id);
      const content = await contentDAO.getFirstContent(id);
      res.status(200).json(content);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/conteudos/idModulo/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await validateModuleId(id);
      res.status(200).json(await contentDAO.getFirstContentOfModule(id));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/conteudos/porIdTrilha/:idTrail", async (req, res) => {
    const idTrail = req.params.idTrail;

    try {
      await validateTrailId(idTrail);
      const content = await contentDAO.getAllContentByTrailId(idTrail);
      res.status(200).json(content);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/conteudos/porIdModulo/:idModule", async (req, res) => {
    const idModule = req.params.idModule;

    try {
      await validateModuleId(idModule);
      res.status(200).json(await contentDAO.getByIdModule(idModule));
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get("/usuario-conteudo", async (req, res) => {
    try {
      res.status(200).json(await contentDAO.getAllUserContent());
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.get(
    "/usuario-conteudo/conteudo-concluido/idUsuario/:idUser/idTrilha/:idTrail",
    async (req, res) => {
      const idUser = req.params.idUser;
      const idTrail = req.params.idTrail;

      try {
        await validateTrailId(idTrail);
        await validateUserId(idUser);
        const contents = await contentDAO.getAllContentDoneByUserIdAndTrailId(
          idUser,
          idTrail
        );
        res.status(200).json(contents);
      } catch (e) {
        res.status(404).json({
          msg: e.message,
          error: true,
        });
      }
    }
  );

  app.get(
    "/usuario-conteudo/conteudo-concluido/idUsuario/:idUser/idModulo/:idModule",
    async (req, res) => {
      const idUser = req.params.idUser;
      const idModule = req.params.idModule;

      try {
        await validateModuleId(idModule);
        await validateUserId(idUser);
        const contents = await contentDAO.getAllContentDoneByUserIdAndModuleId(
          idUser,
          idModule
        );
        res.status(200).json(contents);
      } catch (e) {
        res.status(404).json({
          msg: e.message,
          error: true,
        });
      }
    }
  );

  app.get(
    "/usuario-conteudo/ultimo-concluido/idUsuario/:idUser/idModulo/:idModule",
    async (req, res) => {
      const idUser = req.params.idUser;
      const idModule = req.params.idModule;

      try {
        await validateModuleId(idModule);
        await validateUserId(idUser);
        res
          .status(200)
          .json(
            await contentDAO.getLastContentDoneByUserIdAndModuleId(
              idUser,
              idModule
            )
          );
      } catch (e) {
        res.status(404).json({
          msg: e.message,
          error: true,
        });
      }
    }
  );

  app.post("/conteudos", async (req, res) => {
    const body = req.body;

    try {
      if (validateBodyContent(...Object.values(body))) {
        const newContent = new Contents(...Object.values(body));
        res.status(201).json(await contentDAO.postContent(newContent));
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.post("/usuario-conteudo", async (req, res) => {
    const body = req.body;
    try {
      const newContent = new ContentsUsers(...Object.values(body));
      await validateUserId(newContent.idUser);
      await contentDAO._verifyId(newContent.idContent);
      res
        .status(201)
        .json(
          await contentDAO.postContentUser(
            newContent.idUser,
            newContent.idContent,
            newContent.done
          )
        );
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.put("/conteudos/id/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      if (validateBodyContent(...Object.values(body))) {
        await contentDAO._verifyId(id);
        const contentUpdated = new Contents(...Object.values(body));
        const updateContent = await contentDAO.putContent(id, contentUpdated);
        res.status(200).json(updateContent);
      }
    } catch (e) {
      res.status(e.status).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete("/conteudos/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
      await contentDAO._verifyId(id);
      const deleteContent = await contentDAO.deleteContent(id);
      res.status(200).json(deleteContent);
    } catch (e) {
      res.status(404).json({
        msg: e.message,
        error: true,
      });
    }
  });

  app.delete(
    "/usuario-conteudo/idUser/:idUser/idContent/:idContent",
    async (req, res) => {
      const idUser = req.params.idUser;
      const idContent = req.params.idContent;

      try {
        await validateUserId(idUser);
        await contentDAO._verifyId(idContent);
        const deleteContentUser = await contentDAO.deleteContentUser(
          idUser,
          idContent
        );

        res.status(200).json(deleteContentUser);
      } catch (e) {
        res.status(404).json({
          msg: e.message,
          error: true,
        });
      }
    }
  );
};

export default contentController;
