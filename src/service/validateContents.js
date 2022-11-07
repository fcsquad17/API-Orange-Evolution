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

export default validateBodyContent;
