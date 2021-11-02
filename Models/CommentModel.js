const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const commentSchema = mongoose.Schema({
    commentId: {type: Number, required: true, unique: true, trim: true},
    userId: {type: String, ref: 'user'},
    boardId: {type: Number, ref: 'board'},
    parentId: {type: Number, ref: 'comment'},
    depth: {type: Number, required: true, default: 1},
    contents: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true, default: Date.now()},
    updatedDt: {type: Date, required: true, default: Date.now()},
});

commentSchema.plugin(
    autoIncrement.plugin,{
         model : 'comment', // line 30에 모델명 있음 
         field : 'commentId',
         startAt : 1, //시작
         increment : 1 // 증가
});
commentSchema.statics.create = function(boardId, contents, depth, parentId, userId){
    const comment = new this({boardId, contents, depth, parentId, userId});
    return comment.save();
}
commentSchema.statics.updateOne = function(commentId, contents){
    return this.findOneAndUpdate({commentId}, {contents}); // 모델에 굳이 함수 안만들고 컨트롤러에서 바로 이거 쓰게해도 되나 
}

commentSchema.statics.getCommentList = async function(boardId, parentId, depth, pageNo, pageSize){
    try {
        let result, count;
        const offset = (pageNo-1)*pageSize;
        if (depth == 1){
            result = await this.find({boardId, depth})
                        .sort({createdDt: -1})
                        .skip(offset)
                        .limit(pageSize);
            count = await this.count({parentId, depth});
        }
        else {
            result = await this.find({parentId, depth})
                        .sort({createdDt: -1})
                        .skip(offset)
                        .limit(pageSize);
            count = await this.count({parentId, depth});
        }
        return { result, count };
    }catch(err){
        throw err;
    }
}
module.exports = mongoose.model('comment', commentSchema);