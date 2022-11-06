import ContentDAO from "../DAO/content-DAO.js";
import ContentsUsers from "../model/Contents.js";
import { validateTrailId, validateUserId } from "../service/validate.js";

const contentController = (app, db) => {
  const contentDAO = new ContentDAO(db);

  app.get("/conteudo/idTrilha/:id", async (req, res) => {
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

  app.get("/conteudo/porIdTrilha/:idTrail", async (req, res) => {
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
