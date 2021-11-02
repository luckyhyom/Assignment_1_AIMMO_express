const board = require('../Models/BoardModel')

const writeBoard = async function(req, res, next) {
    try {
        const { title, contents, categoryCode} = req.body
        const userId = req.user.userId
        if (!userId) throw new Error("로그인이 필요합니다.")
        await board.create(title, contents, categoryCode, userId)
        return res.status(201).json({
            success: true,
            message: "게시글이 등록되었습니다.",
            board
        })
    } catch (e) {
        if (e.code === 11000) {
            e.status = 401
            e.message = "로그인이 필요합니다."
        }
        next(e)
    }
}

const modifyBoard = async function(req, res, next) {
    try {
        const userId = req.user.userId
        const userInfo = await board.find({ userId })
        if (!userInfo) throw new Error("권한이 없습니다.") 

        const {title, contents, categoryCode} = req.body
        const boardInfo = await board.updateOne(
            {
                boardId: req.params.id,
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
    } catch (e) {
        if (e.message === "권한이 없습니다.")
            e.status = 403
        next(e)
    }
}

const deleteBoard = async function (req, res, next) {
    try {
        const userInfo = await board.find({ userId })
        if (!userInfo) throw new Error("권한이 없습니다.") 

        const boardInfo = await board.deleteOne({ boardId: req.params.id, userId: req.user.userId})
        if(!boardInfo) throw new Error("존재하지 않는 게시글입니다.")

        res.status(200).json({
            success: true, 
            message: "삭제되었습니다.", 
            boardInfo
        })
    } catch (e) {
        next(e)
        
    }
}

const listBoard = async function (req, res) {
    try {
        const {title, author, pageNo} = req.query
        var postQuery = []
        var orQuery = {}

        const pageSize = Math.max(1, pageNo)
        var limit = 10
        var skipSize = (pageSize-1)*10
        
        if (title) { 
            postQuery.push({title: {$regex: title}})
        } else if (author) {
            postQuery.push({userId: {$regex: author}})
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
        
        res.status(200).json({
            success: true,
            message:"성공했습니다.", 
            skipSize,
            boardInfo
        })
        
    } catch (e) {
        console.log(e)
        res.status(404).json({
            success: false,
            message: "존재하지 않는 페이지입니다."
        })
    }
}

const detailBoard = async function (req, res) {
    try {
        const userId = req.user.userId
        const boardInfo = await board.findOne({ 
            boardId: req.params.id, 
            userId
        })
        if (!boardInfo) throw new Error("존재하지 않는 게시글입니다.")
        res.status(200).json({
            boardInfo
        })
    } catch (e) {
        console.log(e)
        if (e.message === "존재하지 않는 게시글입니다.")
            res.status(404).json({
                success: false,
                message: e.message
            })
    }
}

module.exports = {
    writeBoard,
    modifyBoard,
    deleteBoard,
    listBoard,
    detailBoard
}