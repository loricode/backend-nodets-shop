import jwt from "jsonwebtoken";

let privateKey = "sadasdsdfsdñfsdopmopm";

export const createToken = (email: string) => {
  if (!privateKey) return;

  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, email: email },
    privateKey
  );

  return token;
};

export const verifyToken = (token: string) => {
  if (!privateKey) return;
  return jwt.verify(token, privateKey);
};
