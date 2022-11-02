const validate = (nome_completo, email, senha, id_trilhas, admin) => {
  if (
    nome_completo !== undefined &&
    email !== undefined &&
    senha !== undefined &&
    id_trilhas !== undefined &&
    admin !== undefined
  ) {
    return true;
  } else {
    throw new Error("Há alguma informação faltando.");
  }
};

export default validate;
