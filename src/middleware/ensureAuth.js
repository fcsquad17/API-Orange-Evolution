import { response } from "express";
import jsonwebtoken from "jsonwebtoken";

export function ensureAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      msg: "Não há token",
      error: true,
    });
  }

  try {
    jsonwebtoken.verify(authToken, process.env.SECRET);
    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Token inválido",
      error: true,
    });
  }
}
