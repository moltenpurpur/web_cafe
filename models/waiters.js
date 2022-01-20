var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WaitersSchema = new Schema(
    {
        nameWaiter: String,
        photo: String
    }
);

WaitersSchema
    .virtual('url')
    .get(function () {
        return '/catalog/waiters/' + this._id;
    });

module.exports = mongoose.model('Waiters', WaitersSchema)