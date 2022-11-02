const validate = (nome_completo, email, senha, id_trilhas, admin) => {
  if (nome_completo && email && senha && id_trilhas && admin) {
    return true;
  } else {
    throw new Error("Há alguma informação faltando.");
  }
};

export default validate;
