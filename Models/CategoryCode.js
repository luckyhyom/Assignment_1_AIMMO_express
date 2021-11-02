const mongoose = require('mongoose');

const cateCode = mongoose.Schema({
    categoryCode: {type: Number, required: true, unique: true},
    categoryName: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true, default: Date.now()},
    updatedDt: {type: Date, required: true, default: Date.now()},
});

cateCode.statics.initial = async function(){
    await this.deleteMany({});
    const data = [
        {categoryCode: 0, categoryName: '자유게시판'},
        {categoryCode: 1, categoryName: '비밀게시판'},
        {categoryCode: 2, categoryName: '장터게시판'},
    ];
    this.create(data);
}
module.exports = mongoose.model('categoryCode', cateCode);