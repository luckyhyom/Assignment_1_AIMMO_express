const { createToken, decodeToken } = require("../libs/token");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.jwtSecretKey;

const fakeUser = {
  userId: "lj",
  userName: "길동",
};

const createdToken = jwt.sign(fakeUser, jwtSecretKey, {
  expiresIn: "3h",
});

describe("libs test", () => {
  it("token 을 생성한다", () => {
    const joinUser = createToken({
      userId: fakeUser.userId,
      userName: fakeUser.userName,
    });
    expect(joinUser).toEqual(createdToken);
  });
  it("토근을 해석한다.", () => {
    const decodedToken = jwt.verify(createdToken, jwtSecretKey);
    expect(decodedToken.userId).toEqual(fakeUser.userId);
    expect(decodedToken.userName).toEqual(fakeUser.userName);
  });
});
