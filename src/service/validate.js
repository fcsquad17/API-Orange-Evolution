import TrilhasDAO from "../DAO/trilhas-DAO.js";
import ErrStatus from "../model/Error.js";
import UsersDAO from "../DAO/users-DAO.js";
import dbSq from "../database/db-sqlite.js";

const trilhasDAO = new TrilhasDAO(dbSq);
const usersDAO = new UsersDAO(dbSq);

const validateTrailId = async (idTrail) => {
  const trail = await trilhasDAO._verifyId(idTrail);
  return trail;
};

const validateUserId = async (idUser) => {
  const user = await usersDAO._verifyId(idUser);
  return user;
};

const validateBodyUser = (nome_completo, email, senha, admin) => {
  if (
    nome_completo !== undefined &&
    email !== undefined &&
    senha !== undefined &&
    admin !== undefined
  ) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

const validateBodyContent = (
  titulo,
  tipo,
  duracao,
  fonte,
  descricao,
  tag,
  moduloId
) => {
  if (
    titulo !== undefined &&
    tipo !== undefined &&
    duracao !== undefined &&
    fonte !== undefined &&
    descricao !== undefined &&
    tag !== undefined &&
    moduloId !== undefined
  ) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export {
  validateBodyUser,
  validateTrailId,
  validateUserId,
  validateBodyContent,
};
