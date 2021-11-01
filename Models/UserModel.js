const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true},
    userName: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});

// user가 생성되거나 변경될 때, password 필드가 변경되었으면 저장하기 전에 암호화 후 저장해줌 
userSchema.pre('save', function(next){
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt){
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
})

// model 함수들 아래로 작성 ~!

module.exports = mongoose.model('user', userSchema);