const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    boardId: {type: Number, required: true, unique: true, trim: true},
    userId: {type: String, ref: 'user'},
    categoryCode: {type: Number, ref: 'categoryCode'},
    title: {type: String, required: true, trim: true},
    contents: {type: String, required: true, trim: true},
    readUser: {type: Object, trim: true},
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});

module.exports = mongoose.model('board', boardSchema);