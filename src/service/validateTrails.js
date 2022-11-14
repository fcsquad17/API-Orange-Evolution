import TrilhasDAO from "../DAO/trilhas-DAO.js";
import dbSq from "../database/db-sqlite.js";
import ErrStatus from "../model/Error.js";

const trilhasDAO = new TrilhasDAO(dbSq);

const validateTrailId = async (idTrail) => {
  return await trilhasDAO._verifyId(idTrail);
};

const validateBodyTrail = (titulo, descricao) => {
  if (titulo && descricao !== null && descricao !== undefined) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export { validateTrailId, validateBodyTrail };
