const validate = (nome_completo, email, senha, id_trilhas, admin, id) => {
  if (nome_completo && email && senha && id_trilhas && admin && id) {
    return true;
  } else {
    throw new Error("Há alguma informação faltando.");
  }
};

export default validate;
