const user = require('../Models/UserModel');
const { createToken, jwtMiddleware } = require('../libs/token');

async function join (req, res, next){
    try {
        const { userId, userPw, userName } = req.body;
        await user.create(userId, userPw, userName);
        const token = createToken({userId, userName});
        res.status(201).json({
            success: true,
            message: "회원가입에 성공했습니다.",
            token
        });
    } catch(err) {
        console.log(err);
        if (err.code === 11000) 
            res.status(404).json({
                success: false,
                message: "이미 존재하는 ID입니다. ",
            });
        res.status(500).json({
            success: false,
            message: "서버가 응답할 수 없습니다.",
        });
    }
}

async function signin (req, res, next){
    try {
        const { userId, userPw } = req.body;
        const result = await user.checkLogin(userId, userPw);
        if (result === null) throw new Error('존재하지 않는 아이디입니다.');
        if (!result) throw new Error('비밀번호를 확인해주세요.');
        const token = createToken({
            userId: result.userId,
            userName: result.userName
        });
        res.status(200).json({
            success: true,
            message: "로그인에 성공했습니다.",
            token
        });
    } catch(err) {
        console.log(err);
        if (err.message === '존재하지 않는 아이디입니다.' || err.message === '비밀번호를 확인해주세요.')
            res.status(404).json({
                success: false,
                message: err.message
            });
        else
            res.status(500).json({
                success: false,
                message: "서버가 응답할 수 없습니다.",
            });
    }
}


module.exports = {
    join,
    signin,
}