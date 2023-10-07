import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "token was not provided" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      "de2d4dba9ca94e7cd4fc69c426449b11"
    );

    console.log(decoded);

    return next();
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
};
