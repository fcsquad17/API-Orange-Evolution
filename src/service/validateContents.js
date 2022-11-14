import ErrStatus from "../model/Error.js";

const validateBodyContent = (
  titulo,
  tipo,
  duracao,
  fonte,
  descricao,
  tag,
  moduloId
) => {
  if (titulo && tipo && duracao && fonte && descricao && tag && moduloId) {
    return true;
  } else {
    throw new ErrStatus("Há alguma informação faltando no body.", 400);
  }
};

export default validateBodyContent;
