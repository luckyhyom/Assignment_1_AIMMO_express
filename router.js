const express = require('express');
const router = express.Router();

// import controllers
const userController = require('./Controllers/userController');
const commentController = require('./Controllers/CommentController');

router.post('/signup', userController.signup); // 회원가입
router.post('/signin', userController.signin); // 로그인

router.post('/board', ); // 게시글 생성
router.patch('/board', ); // 게시글 수정
router.delete('/board/:id', ); // 게시글 삭제
router.get('/board', ); // 게시글 목록 가져오기 pagination / 검색
router.get('/board/:id', ); // 게시글 내용 가져오기

router.post('/comment', commentController.writeComment); // 댓글,대댓글 생성
router.delete('/comment/:id', commentController.deleteComment) // 댓글,대댓글 삭제
router.patch('/comment/:id', commentController.modifyComment); // 댓글, 대댓글 수정
router.get('/comment', commentController.getCommentList); // 댓글, 대댓글 읽기 pagination 

module.exports = router; 