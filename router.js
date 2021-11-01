const express = require('express');
const router = express.Router();

// import controllers
const userController = require('./Controllers/userController');

router.post('/user', userController.join); // 회원가입
router.post('/signin', userController.signin); // 로그인
router.get ('/signout', ); // 로그아웃

router.post('/board', ); // 게시글 생성
router.patch('/board', ); // 게시글 수정
router.delete('/board/:id', ); // 게시글 삭제
router.get('/board/list', ); // 게시글 목록 가져오기 pagination
router.get('/board/:id', ); // 게시글 내용 가져오기
router.get('board/search', ) //

router.post('/comment', ); // 댓글,대댓글 생성
router.delete('/comment/:id', ) // 댓글,대댓글 삭제
router.patch('/comment/:id', ); // 댓글, 대댓글 수정
router.get('/comment/:boardId', ); // 댓글 읽기 pagination 
router.get('/comment/:commentId', ) // 대댓글 읽기 pagination

module.exports = router; 