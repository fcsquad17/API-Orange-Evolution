import jsonwebtoken from "jsonwebtoken";

export const genToken = (user) => {
  return jsonwebtoken.sign(user, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
};
