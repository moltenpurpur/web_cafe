var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TableSchema = new Schema(
    {
        numberTable: {type: Number, min: 1},
        numberOfSeats: {type: Number, min: 2, max: 8}
    }
);

TableSchema
    .virtual('url')
    .get(function () {
        return '/catalog/table/' + this._id;
    });

module.exports = mongoose.model('Table', TableSchema);