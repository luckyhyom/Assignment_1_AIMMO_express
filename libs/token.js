const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.jwtSecretKey;

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecretKey, {
    expiresIn: "3h",
  });
};
const decodeToken = (token) => {
  return jwt.verify(token, jwtSecretKey);
};
const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // token이 없으면 바로 return
  if (token === undefined) {
    next();
    return;
  }
  try {
    const decoded = decodeToken(token);
    // const renewMin = 10; // 토큰 만료시간이 renewMin분 이하이면 재발급
    // if (decoded.exp - Date.now()/1000 < renewMin*60) {
    //     const { user_id } = decoded;
    //     const freshToken = createToken({user_id});
    //     res.cookie('access_token', freshToken, {
    //         httpOnly: true, sameSite: 'none', secore: true
    //     });
    // }
    const userId = decoded.userId;
    const userName = decoded.userName;
    req.user = { userId, userName };
  } catch (err) {
    // token validation 실패
    req.user = null;
    console.log("token validation fail");
  } finally {
    next();
  }
};

module.exports = {
  createToken: createToken,
  jwtMiddleware: jwtMiddleware,
  decodeToken,
};
