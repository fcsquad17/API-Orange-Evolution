import ErrStatus from "../model/Error.js";
import dbSq from "../database/db-sqlite.js";
import ModulesDAO from "../DAO/modules-DAO.js";

const modulesDAO = new ModulesDAO(dbSq);

const validateModuleId = async (id) => {
  return await modulesDAO._verifyId(id);
};

const validateBodyModule = (titulo, descricao, moduloId) => {
  if ((titulo, descricao, moduloId)) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export { validateBodyModule, validateModuleId };
