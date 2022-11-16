import { response } from "express";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

export function ensureAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      msg: "Não há token",
      error: true,
    });
  }

  const secret = dotenv.config();
  try {
    jsonwebtoken.verify(authToken, secret.parsed.SECRET);
    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Token inválido",
      error: true,
    });
  }
}
