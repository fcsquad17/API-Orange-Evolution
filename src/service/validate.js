import TrilhasDAO from "../DAO/trilhas-DAO.js";
import dbSq from "../database/db-sqlite.js";
const trilhasDAO = new TrilhasDAO(dbSq);

const validateTrailId = async (idTrail) => {
  const trail = await trilhasDAO._verifyId(idTrail);
  return trail;
};

const validate = (nome_completo, email, senha, admin) => {
  if (
    nome_completo !== undefined &&
    email !== undefined &&
    senha !== undefined &&
    admin !== undefined
  ) {
    return true;
  } else {
    throw new Error("Há alguma informação faltando.");
  }
};

export { validate, validateTrailId };
