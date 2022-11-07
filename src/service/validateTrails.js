import TrilhasDAO from "../DAO/trilhas-DAO.js";
import dbSq from "../database/db-sqlite.js";
import ErrStatus from "../model/Error.js";

const trilhasDAO = new TrilhasDAO(dbSq);

const validateTrailId = async (idTrail) => {
  const trail = await trilhasDAO._verifyId(idTrail);
  return trail;
};

const validateBodyTrail = (titulo, descricao) => {
  if (titulo !== undefined && descricao !== descricao) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export { validateTrailId, validateBodyTrail };
