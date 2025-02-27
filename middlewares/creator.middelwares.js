import jwt from "jsonwebtoken";
export async function creatorMiddleware(req, res, next) {
  //extract the token
  const token = req.headers.token;

  //make sure  token isn't empty
  if (!token) return res.status(400).json({ message: "Token does not exist" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.creatorId = decoded.id;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token", error });
  }
}
