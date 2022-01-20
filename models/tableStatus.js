var mongoose = require('mongoose');
const moment = require("moment");
var Schema = mongoose.Schema;
var TableStatusSchema = new Schema(
    {
        start: Date,
        table: {type: Schema.ObjectId, ref:'Table', required:true},
        status: {type: String, required: true, enum:['Free', 'Busy before lunch', 'Busy after lunch'], default: 'Free'}
    }
);

TableStatusSchema
    .virtual('url')
    .get(function () {
        return '/catalog/tableStatus/' + this._id;
    });

TableStatusSchema
    .virtual('date_start_formatted')
    .get(function () {
        return moment(this.start).format("MMM Do YY");
    });

module.exports = mongoose.model('TableStatus', TableStatusSchema);