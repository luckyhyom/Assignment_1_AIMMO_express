const mongoose = require('mongoose');

const cateCode = mongoose.Schema({
    categoryCode: {type: Number, required: true, unique: true},
    categoryName: {type: String, required: true, trim: true},
    createdDt: {type: Date, required: true},
    updatedDt: {type: Date, required: true},
});

module.exports = mongoose.model('categoryCode', cateCode);