const user = require('../Models/UserModel');
const { createToken } = require('../libs/token');

async function signup (req, res, next){
    try {
        const { userId, userPw, userName } = req.body;
        await user.create(userId, userPw, userName);
        const token = createToken({userId, userName});
        res.status(201).json({
            success: true,
            message: '회원가입에 성공했습니다.',
            token
        });
    } catch(err) {
        if (err.code === 11000){
            err.status = 404;
            err.message = '이미 존재하는 id입니다.';
        }
        next(err);
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
            data: token
        });
    } catch(err) {
        if (err.message === '존재하지 않는 아이디입니다.' || err.message === '비밀번호를 확인해주세요.')
            err.status = 404;
        next(err);
    }
}

module.exports = {
    signup,
    signin,
}