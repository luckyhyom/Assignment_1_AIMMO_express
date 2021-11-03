const db = require("./db");
const board = require("../Models/BoardModel");
const comment = require("../Models/CommentModel");

// 전역 데이터
const title = "테스트 글 1";
const author = "유저1";
const contents = "유저1이 적은 테스트 글 입니다.";
const categoryCode = 0;
const userId = "1";

// Setup connection to the database
beforeAll(async () => {
  await db.connect();

  const arr = Array.from({ length: 2 }, (_, i) => i + 1);

  for await (const item of arr) {
    const boardInfo = await board.create(title, contents, categoryCode, userId);
  }
});

afterAll(async () => await db.close());
describe("게시글 CRUD", () => {
  it("전체 글을 조회 해 올 수 있다.", async () => {
    // given
    jest.setTimeout(10000);
    const title = "테스트 글 1";
    const author = "유저1";
    const contents = "유저1이 적은 테스트 글 입니다.";
    const categoryCode = 0;
    const userId = "1";
    const pageNo = Number(1);
    let postQuery = [];
    let orQuery = {};
    const pageSize = Number(5);
    let offset = (pageNo - 1) * pageSize;

    if (title) {
      postQuery.push({ title: { $regex: title } });
    } else if (author) {
      postQuery.push({ userId: { $regex: author } });
    } else if (categoryCode) {
      postQuery.push({ categoryCode: parseInt(categoryCode) });
    }

    if (postQuery.length !== 0) {
      orQuery = { $or: postQuery };
    }

    // when
    let boardInfo = await board
      .find(orQuery)
      .sort({ updatedDt: -1 }) // 업데이트된 날짜로 내림차순
      .skip(parseInt(offset))
      .limit(pageSize)
      .populate("_id")
      .exec();

    // then
    expect(boardInfo.length).toBe(2);
    expect(boardInfo[0].userId).toEqual(userId);
    expect(boardInfo[0].categoryCode).toEqual(categoryCode);
    expect(boardInfo[0].contents).toEqual(contents);
    expect(boardInfo[0].title).toEqual(title);
  });
  it("게시글을 작성 할 수 있다.", async () => {
    // given
    const title = "글 생성 테스트";
    const contents = "글 작성 테스트";
    const categoryCode = 0;
    const userId = "1";
    if (!userId) throw new Error("로그인이 필요합니다.");
    const boardInfo = await board.create(title, contents, categoryCode, userId);
    expect(boardInfo.userId).toEqual(userId);
    expect(boardInfo.categoryCode).toEqual(categoryCode);
    expect(boardInfo.contents).toEqual(contents);
    expect(boardInfo.title).toEqual(title);
  });
  it("단일 게시글을 조회 할 수  있다.", async () => {
    const boardId = 1;
    const boardInfo = await board.findOne({
      boardId,
    });

    // then
    expect(boardInfo.userId).toEqual(userId);
    expect(boardInfo.categoryCode).toEqual(categoryCode);
    expect(boardInfo.contents).toEqual(contents);
    expect(boardInfo.title).toEqual(title);
  });

  it("게시물을 수정 할 수 있다. ", async () => {
    // given
    const userId = "1";
    const boardId = 1;
    const title = "수정 게시글";
    const contents = "수정 내용";
    const categoryCode = 1;

    // when
    const boardUpdate = await board.updateOne(
      {
        boardId,
        userId,
      },
      { $set: { title, updatedDt: Date.now(), contents, categoryCode } }
    );

    const boardInfo = await board.findOne({
      boardId,
    });

    // then
    expect(boardInfo.categoryCode).toEqual(categoryCode);
    expect(boardInfo.contents).toEqual(contents);
    expect(boardInfo.title).toEqual(title);
  });

  it("게시글을 삭제할 수 있다.", async () => {
    // given
    const userId = "1";
    const boardId = 1;

    // when
    const boardInfo = await board.findOne({ boardId, userId });
    await board.deleteOne({ boardId, userId });
    await comment.deleteMany({ boardId });
    const deletedBoardInfo = await board.findOne({
      boardId,
    });

    // then
    expect(deletedBoardInfo).toBeNull();
  });
});
