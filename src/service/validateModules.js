import ErrStatus from "../model/Error.js";

const validateBodyModule = (titulo, descricao, moduloId) => {
  if ((titulo, descricao, moduloId)) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export default validateBodyModule;
