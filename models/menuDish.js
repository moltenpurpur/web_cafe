var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MenuDishSchema = new Schema(
    {
        nameDish: String,
        composition: String,
        cost: Number,
        grams: String
    }
);

MenuDishSchema
    .virtual('url')
    .get(function () {
        return '/catalog/menuDish/' + this._id;
    });

module.exports = mongoose.model('MenuDish', MenuDishSchema);