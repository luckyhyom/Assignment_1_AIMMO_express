const express = require('express');
const router = express.Router();

// import controllers
const userController = require('./Controllers/userController');
const boardController = require('./Controllers/boardController');

router.post('/user', userController.signup); // 회원가입
router.post('/signin', userController.signin); // 로그인

router.post('/board', boardController.writeBoard); // 게시글 생성
router.patch('/board/:id', boardController.modifyBoard); // 게시글 수정
router.delete('/board/:id', boardController.deleteBoard); // 게시글 삭제
router.get('/board', boardController.listBoard); // 게시글 목록 가져오기 pagination
router.get('/board/:id', boardController.detailBoard); // 게시글 내용 가져오기

router.post('/comment', ); // 댓글,대댓글 생성
router.delete('/comment/:id', ) // 댓글,대댓글 삭제
router.patch('/comment/:id', ); // 댓글, 대댓글 수정
router.get('/comment/:boardId', ); // 댓글 읽기 pagination 
router.get('/comment/:commentId', ) // 대댓글 읽기 pagination

module.exports = router; 