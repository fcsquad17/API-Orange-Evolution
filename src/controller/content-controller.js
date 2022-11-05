import ContentDAO from "../DAO/content-DAO.js";
import ContentsUsers from "../model/Contents.js";
import { validate, validateTrailId } from "../service/validate.js";

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

  app.post("/usuario-conteudo/", async (req, res) => {
    const body = req.body;
    try {
      if (validate(...Object.values(body))) {
        const newContent = new ContentsUsers(...Object.values(body));
        res
          .status(201)
          .json(
            await contentDAO.postContentUser(
              newContent.idUser,
              newContent.idContent,
              newContent.done
            )
          );
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message,
        error: true,
      });
    }
  });
};

export default contentController;
