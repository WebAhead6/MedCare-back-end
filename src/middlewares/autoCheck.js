const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.access_token)
      return res
        .status(401)
        .json({ message: "unauthorized, must log in", code: 401 });

    const decoded = await jwt.verify(
      req.cookies.access_token,
      process.env.JWT_SECRET
    );
    res.locals.identityNumber = decoded.user;
    res.locals.id = decoded.id;

    res.locals.signedIn = true;

    next();
  } catch (error) {
    res.status(403).json({ error: "access forbidden", code: 403 });
  }
};
