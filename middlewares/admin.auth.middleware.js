import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized Login again",
      });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.json({ success: false, message: "Invalid Credential" });
    }

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default adminAuth;
