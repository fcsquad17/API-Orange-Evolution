import * as dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

export const genToken = (user) => {
  const secret = dotenv.config();

  return jsonwebtoken.sign(user, secret.parsed.SECRET, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
};
