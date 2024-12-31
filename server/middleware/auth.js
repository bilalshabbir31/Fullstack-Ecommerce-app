import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  // const token = req.cookies.token;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "UnAuthorized User!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid access token" });
  }
};
