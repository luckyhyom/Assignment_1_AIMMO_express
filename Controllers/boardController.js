const board = require('../Models/BoardModel')
const category = require('../Models/CategoryCode');
const comment = require('../Models/CommentModel');

const writeBoard = async function(req, res, next) {
    try {
        const { title, contents, categoryCode} = req.body
        const userId = req.user?.userId
        if (!userId) throw new Error("로그인이 필요합니다.")
        await board.create(title, contents, categoryCode, userId)
        return res.status(201).json({
            success: true,
            message: "게시글이 등록되었습니다."
        })
    } catch (err) {
        if (err.message === "로그인이 필요합니다.")
            err.status = 401
        next(err)
    }
}

const modifyBoard = async function(req, res, next) {
    try {
        const userId = req.user?.userId
        if (!userId) throw new Error("권한이 없습니다.") 
        const userInfo = await board.find({ userId })
        if (!userInfo) throw new Error("권한이 없습니다.") 

        const {title, contents, categoryCode} = req.body
    
        const boardId = req.params.id
        
        const boardInfo = await board.updateOne(
            {
                boardId,
                userId
            },
            { $set : { title, updatedDt: Date.now(), contents, categoryCode }}
        )
        if(!boardInfo) throw new Error("존재하지 않는 게시글입니다.")

        res.status(200).json({
            success: true, 
            message: "수정되었습니다.", 
            boardInfo
        })
    } catch (err) {
        if (err.message === "권한이 없습니다.")
            err.status = 403
        if (err.message === "존재하지 않는 게시글입니다.")
            err.status = 404   
        next(err)
    }
}

const deleteBoard = async function (req, res, next) {
    try {
        const userId = req.user?.userId; 
        if (!userId) throw new Error('권한이 없습니다.');
        const boardId = req.params.id;
        const boardInfo = await board.findOne({ boardId, userId });
        if (!userInfo) throw new Error("권한이 없습니다.") 

        const boardInfo = await board.deleteOne({ boardId, userId})
        if(!boardInfo) throw new Error("존재하지 않는 게시글입니다.")

        await comment.deleteMany({boardId});
        res.status(200).json({
            success: true, 
            message: "삭제되었습니다."
        })
    } catch (err) {
        if (err.message==="권한이 없습니다.")
            err.status = 403
        else if (err.message==="존재하지 않는 게시글입니다.")
            err.status = 404
        next(err)
    }
}

const listBoard = async function (req, res, next) {
    try {
        const {title, author, category, pageNo} = req.query
        var postQuery = []
        var orQuery = {}

        const pageSize = Math.max(1, pageNo)
        var limit = 10
        var skipSize = (pageSize-1)*10
        
        if (title) { 
            postQuery.push({title: {$regex: title}})
        } else if (author) {
            postQuery.push({userId: {$regex: author}})
        } else if (category) {
            postQuery.push({categoryCode: parseInt(category)})
        }
        if (postQuery) {
            orQuery = {$or: postQuery}
        }
        const boardInfo = await board.find(orQuery)
            .sort({ updatedDt: -1 }) // 업데이트된 날짜로 내림차순
            .skip(parseInt(skipSize))
            .limit(limit)
            .populate("_id")
            .exec()
        
        if (!boardInfo) throw new Error("존재하지 않는 페이지입니다.")

        res.status(200).json({
            success: true,
            message:"성공했습니다.", 
            skipSize,
            boardInfo
        })
    } catch (err) {
        if (err.message === "존재하지 않는 페이지입니다.")
            err.status = 404
        next(err)
    }
}

const detailBoard = async function (req, res, next) {
    try {
        const userId = req.user?.userId
        const boardId = req.params.id
        let objOriginal = {}
        const boardInfo = await board.findOne({ 
            boardId
        })
        if (!boardInfo) throw new Error("존재하지 않는 게시글입니다.")

        if (userId !== undefined) {
            if (boardInfo.readUser !== undefined) {
                objOriginal = boardInfo.readUser
            }
            objOriginal[userId] = true
            
            await boardInfo.updateOne(
                {
                $set: {
                    readUser: objOriginal
                }
            }, {
                upsert: true
            })
    
        }
        const cnt = Object.keys(objOriginal).length
        const categoryName = await category.findOne({ categoryCode }).select('categoryName');
        delete boardInfo['readUser']; 
        res.status(200).json({
            success: true,
            message: '성공했습니다.',
            boardInfo,
            cnt,
            categoryName
        })
    } catch (err) {
        if (err.message === "존재하지 않는 게시글입니다.")
            err.status = 404
        next(err)
    }
}

module.exports = {
    writeBoard,
    modifyBoard,
    deleteBoard,
    listBoard,
    detailBoard
}