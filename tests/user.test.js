const db = require("./db");
const user = require("../Models/UserModel");

const userId = "1";
const userPw = "password";
const userName = "길동이";

beforeAll(async () => {
  await db.connect();

  const arr = Array.from({ length: 2 }, (_, i) => i + 1);
  await user.create(userId, userPw, userName);
  const joinUser = await user.findOne({ userId });
});
afterAll(async () => await db.close());

describe("유저 로그인 & 회원가입 테스트", () => {
  it("회원 가입 할 수 있다.", async () => {
    // given
    const userId = "lj";
    const userName = "신규유저";

    // when
    await user.create(userId, userPw, userName);
    const joinUser = await user.findOne({ userId });

    // then
    expect(joinUser.userId).toEqual(userId);
    expect(joinUser.userName).toEqual(userName);
  });
  it("로그인 할 수 있다.", async () => {
    // given
    // 전역데이터

    // when
    const result = await user.checkLogin(userId, userPw);

    // then
    expect(result.userId).toEqual(userId);
    expect(result.userName).toEqual(userName);
  });
});
