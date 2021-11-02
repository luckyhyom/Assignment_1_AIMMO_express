const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const boardSchema = mongoose.Schema({
    boardId: {type: Number, required: true, unique: true, trim: true},
    userId: {type: String, ref: 'user'},
    categoryCode: {type: Number, ref: 'categoryCode'},
    title: {type: String, required: true, trim: true},
    contents: {type: String, required: true, trim: true},
    readUser: {type: Object, trim: true}, // key, key개수 - object
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});


boardSchema.plugin(
    autoIncrement.plugin,
    {
         model : 'board', // line 30에 모델명 있음 
         field : 'boardId',
         startAt : 1, //시작
         increment : 1 // 증가
    });
boardSchema.statics.create = function(title, contents, categoryCode, userId) {
    try {
        const board = new this({
            title, contents, categoryCode, userId,
            createdDt: Date.now(),
            updatedDt: Date.now()
        })
        return board.save();
    } catch (e) {
        throw new Error('create')
    }
}


module.exports = mongoose.model('board', boardSchema);