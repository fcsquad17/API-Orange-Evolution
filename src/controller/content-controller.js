import ContentDAO from "../DAO/content-DAO.js";

const contentController = (app, db) => {
  const contentDAO = new ContentDAO(db);
};
