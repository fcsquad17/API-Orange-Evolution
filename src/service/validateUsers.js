import ErrStatus from "../model/Error.js";
import UsersDAO from "../DAO/users-DAO.js";
import dbSq from "../database/db-sqlite.js";

const usersDAO = new UsersDAO(dbSq);

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

export { validateUserId, validateBodyUser };
