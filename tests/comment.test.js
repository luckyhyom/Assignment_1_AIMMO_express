const db = require("./db");
const board = require("../Models/BoardModel");
const comment = require("../Models/CommentModel");

// 전역 데이터
const boardId = 1;
const contents = "댓굴";
const depth = 1;
const title = "테스트 글 1";
const author = "유저1";
const boardContents = "유저1이 적은 테스트 글 입니다.";
const userId = "1";
const categoryCode = 0;

beforeAll(async () => {
  // Setup connection to the database
  await db.connect();

  const arr = Array.from({ length: 2 }, (_, i) => i + 1);

  for await (const item of arr) {
    const boardInfo = await board.create(title, contents, categoryCode, userId);
    let parentId = null;
    if (depth == 2) parentId = req.body.parentId;
    const commentInfo = await comment.create(
      boardId,
      contents,
      depth,
      parentId,
      userId
    );
    const reParentId = 2;
    const reContents = "글 작성 테스트";
    const reUserId = "2";
    const reDepth = 2;
    const reCommentInfo = await comment.create(
      boardId,
      reContents,
      reDepth,
      reParentId,
      reUserId
    );
  }
});
afterAll(async () => await db.close());
describe("댓글 CRUD", () => {
  it("댓글을 작성 할 수 있다.", async () => {
    // given
    let parentId = null;
    const title = "글 생성 테스트";
    const contents = "글 작성 테스트";
    const categoryCode = 0;
    const userId = "1";

    // when
    const commentInfo = await comment.create(
      boardId,
      contents,
      depth,
      parentId,
      userId
    );

    // then
    expect(commentInfo.userId).toEqual(userId);
    expect(commentInfo.contents).toEqual(contents);
    expect(commentInfo.parentId).toEqual(null);
    expect(commentInfo.commentId).toEqual(5);
    expect(commentInfo.depth).toEqual(1);
  });
  it("대댓글을 댓글을 작성 할 수 있다.", async () => {
    let parentId = 2;
    const title = "글 생성 테스트";
    const contents = "글 작성 테스트";
    const categoryCode = 0;
    const userId = "1";
    const depth = 2;
    const commentInfo = await comment.create(
      boardId,
      contents,
      depth,
      parentId,
      userId
    );

    // then
    expect(commentInfo.userId).toEqual(userId);
    expect(commentInfo.contents).toEqual(contents);
    expect(commentInfo.parentId).toEqual(2);
    expect(commentInfo.commentId).toEqual(6);
    expect(commentInfo.depth).toEqual(2);
  });
  it("댓글을 조회 할 수  있다.", async () => {
    // given
    const commentId = undefined;
    const boardId = 1;
    const pageNo = Number(1);
    const pageSize = Number(5);
    let depth = 1;
    if (commentId !== undefined) depth = 2; // 대댓글

    // when
    let { result, count } = await comment.getCommentList(
      boardId,
      commentId,
      depth,
      pageNo,
      pageSize
    );

    // then
    const maxPageNo = Math.ceil(count / pageSize);
    expect(result.length).toEqual(3);
    expect(count).toEqual(3);
    expect(result[1].depth).toEqual(1);
    expect(result[1].contents).toEqual("댓굴");
  });

  it("댓글을 수정 할 수 있다. ", async () => {
    // given
    const commentId = 2;
    const contents = "수정댓글";
    const userId = 1;

    // when
    const commentInfo = await comment.findOneAndUpdate(
      { commentId },
      { contents, updatedDt: Date.now() }
    );
  });

  it("댓글을 삭제할 수 있다.", async () => {
    // given
    const commentId = 2;
    await comment.findOneAndRemove({ commentId });
    await comment.deleteMany({ parentId: commentId });
    // when
    const deletedComment = await comment.findOne({ commentId });

    // then
    expect(deletedComment).toBeNull();
  });
});
