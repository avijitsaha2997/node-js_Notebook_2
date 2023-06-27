const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decode;
    req.username = username;
    req.userId = userId;
    next();
  } catch {
    next("Authhoriztion failed!!!!!!!!!!");
  }
};

module.exports = checkLogin;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UxMjMiLCJ1c2VySWQiOiI2NDk5OGIxMmVhNTFmNzczOTI4MjcwZjAiLCJpYXQiOjE2ODc4ODY5OTQsImV4cCI6MTY4Nzg5MDU5NH0.ymP8IDFJD2NB_aIunI4_JL7_VehotbXDdP3GyocjhVo
