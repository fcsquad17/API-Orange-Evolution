import ErrStatus from "../model/Error.js";
import UsersDAO from "../DAO/users-DAO.js";
import dbSq from "../database/db-sqlite.js";

const usersDAO = new UsersDAO(dbSq);

const validateUserId = async (idUser) => {
  return await usersDAO._verifyId(idUser);
};

const validateBodyUser = async (nome_completo, email, senha, admin) => {
  if (
    nome_completo &&
    email &&
    senha &&
    admin !== undefined &&
    admin !== null
  ) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export { validateUserId, validateBodyUser };
