import jwt from "jsonwebtoken";

export async function userMiddleware(req, res, next) {
  //extract token
  const token = req.headers.token;

  //validate token
  if (!token) return res.status(400).json({ message: "Token does not exist" });

  try {
    //check if the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error });
  }
}
