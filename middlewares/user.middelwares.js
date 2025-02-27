import jwt from "jsonwebtoken";

export async function userMiddleware(req, res, next) {
  //extract token
  const token = req.headers.token;

  //validate tokeb
  if (!token) return res.status(400).json({ message: "Token does not exist" });

  //check if the token is equal or not
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    return res.status(400).json({ message: "Invalid token" });
  }
}
