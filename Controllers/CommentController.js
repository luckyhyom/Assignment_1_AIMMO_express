const comment = require('../Models/CommentModel');

async function writeComment(req, res, next){
    try{
        const { boardId, contents, depth } = req.body;
        let parentId = null;
        if (depth == 2) parentId = req.body.parentId;
        const userId = req.user?.userId;
        if (!userId) throw new Error('로그인이 필요합니다.');
        await comment.create(boardId, contents, depth, parentId, userId);
        res.status(201).json({
            success: true,
            message: '댓글이 등록되었습니다.'
        });
    } catch(err) {
        if (err.message === '로그인이 필요합니다.') 
            err.status = 401;
        next(err);
    }
}
async function modifyComment(req, res, next){
    try{
        const commentId = req.params.id;
        const { contents } = req.body;
        const userId = req.user?.userId;
        if (!userId) throw new Error('권한이 없습니다.');
        const tempComment = await comment.findOne({commentId});
        if (!tempComment) throw new Error('존재하지 않는 댓글입니다.');
        if (userId !== tempComment.userId) throw new Error('권한이 없습니다.');
        await tempComment.update({contents, updateDt: Date.now()});
        const result = await comment.findOne({commentId});
        res.status(200).json({
            success: true,
            message: '수정되었습니다.',
            result
        })
    }catch(err){
        if (err.message === '권한이 없습니다.') 
            err.status = 403;
        next(err);
    }
}
async function getCommentList(req, res, next){
    try {
        const commentId = req.query.commentId;
        const boardId = req.query.boardId;
        const pageNo = Number(req.query.pageNo);
        const pageSize = Number(req.query.pageSize || 5);
        let depth = 1;
        if (commentId !== undefined) depth = 2; // 대댓글
        let { result, count } = await comment.getCommentList(boardId, commentId, depth, pageNo, pageSize);
        if (!result) throw new Error("존재하지 않는 페이지입니다.");
        const maxPageNo = Math.ceil(count/pageSize);
        res.status(200).json({
            success: true,
            message: '성공했습니다.',
            maxPageNo,
            commentInfo: result
        });
    } catch(err){
        if (err.message === "존재하지 않는 페이지입니다.")
            err.status = 404
        next(err)
    }
}
async function deleteComment(req, res, next){
    try{
        const commentId = req.params.id;
        const userId = req.user?.userId;
        if (!userId) throw new Error('권한이 없습니다.');
        const author = await comment.findOne({commentId});
        if (!author) throw new Error('존재하지 않는 댓글입니다.');
        if (userId !== author.userId) throw new Error('권한이 없습니다.');
        await comment.findOneAndRemove({commentId});
        await comment.deleteMany({parentId: commentId});
        res.status(200).json({
            success: true,
            message: '삭제되었습니다.',
        });
    }catch(err){
        if (err.message === '권한이 없습니다.') 
            err.status = 403;
        if (err.message === '존재하지 않는 댓글입니다.')
            err.status = 404;
        next(err);
    }
    
}
module.exports = {
    writeComment,
    getCommentList,
    modifyComment,
    deleteComment
}