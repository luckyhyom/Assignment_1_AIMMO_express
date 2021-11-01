const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentId: {type: Number, required: true, unique: true, trim: true},
    userId: {type: String, ref: 'user'},
    boardId: {type: Number, ref: 'board'},
    parentId: {type: Number, ref: 'comment'},
    depth: {type: Number, required: true, default: 1},
    contents: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});

module.exports = mongoose.model('comment', commentSchema);