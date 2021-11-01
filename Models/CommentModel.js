const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const commentSchema = mongoose.Schema({
    commentId: {type: Number, required: true, unique: true, trim: true},
    userId: {type: String, ref: 'user'},
    boardId: {type: Number, ref: 'board'},
    parentId: {type: Number, ref: 'comment'},
    depth: {type: Number, required: true, default: 1},
    content: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});

commentSchema.plugin(
    autoIncrement.plugin,
    {
         model : 'comment', // line 30에 모델명 있음 
         field : 'commentId',
         startAt : 1, //시작
         increment : 1 // 증가
    });
commentSchema.statics.create = function(boardId, content, depth, parentId, userId){
    const comment = new this({
        boardId, content, depth, parentId, userId,
        createdDt: Date.now(),
        updatedDt: Date.now()
    });
    return comment.save();
}
module.exports = mongoose.model('comment', commentSchema);