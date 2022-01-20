var Status = require('../models/tableStatus');
var Table = require('../models/table');
var Waiter = require('../models/waiters');
var Dish = require('../models/menuDish');
const {body, validationResult} = require('express-validator');

var async = require('async');

exports.index = function (req, res) {

    async.parallel({
        table_count: function (callback) {
            Table.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
// countDocuments не работает, работает только просто count
        },
        table_status_count: function (callback) {
            Status.count({}, callback);
        },
        table_status_free_count: function (callback) {
            Status.count({status: 'Free'}, callback);
        },
        table_status_busy_before_lunch_count: function (callback) {
            Status.count({status: 'Busy before lunch'}, callback);
        },
        table_status_busy_after_lunch_count: function (callback) {
            Status.count({status: 'Busy after lunch'}, callback);
        },
        dish_count: function (callback) {
            Dish.count({}, callback);
        },
        waiters_count: function (callback) {
            Waiter.count({}, callback);
        }
    }, function (err, results) {
        res.render('index', {title: 'Local Library Home', error: err, data: results});
    });
};

// Display list of all Status.
exports.status_list = function (req, res, next) {

    Status.find({})
        .populate('table')
        .exec(function (err, list_status) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render('status_list', {title: 'Table Status List', status_list: list_status});
        });

};

// Display detail page for a specific Status.
exports.status_detail = async function (req, res) {
    var status = await Status.findById(req.params.id)
    if (status == null) { // No results.
        var err = new Error('error');
        err.status = 404;
        return next(err);
    }

    var table = await Table.findById(status.table)

    // Successful, so render
    res.render('status_detail', {
        title: 'Status Detail', table_status: status, table: table
    });

};

// Display Status create form on GET.
exports.status_create_get = function (req, res) {
    Table.find({}, ['numberTable', 'numberOfSeats', '_id'])
        .exec(function (err, table_list) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('status_form', {title: 'Create Status', tables: table_list});
        });
};

// Handle Status create on POST.
exports.status_create_post = [

    // Validate and sanitise fields.
    body('start', 'Time must be specified').trim().isDate().escape(),
    body('tableId', 'Table must be specified').trim().isLength({min: 1}).escape(),
    body('time').escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        var tableId = req.body.tableId

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a status object with escaped and trimmed data.
        var status = new Status(
            {
                start: req.body.start,
                table: req.body.tableId,
                status: req.body.time
            });

        if (s) {
            ``
        }

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Table.find({}, ['numberTable', 'numberOfSeats', '_id'])
                .exec(function (err, tables) {
                    if (err) {
                        return next(err);
                    }
                    // Successful, so render.
                    res.render('status_form', {title: 'Create Status', errors: errors.array(), tables: tables});
                });
            return;
        } else {

            var s = await Status.find({
                start: req.body.start,
                table: req.body.tableId,
                status: req.body.time
            })
            if (s.length != 0) {
                Table.find({}, ['numberTable', 'numberOfSeats', '_id'])
                    .exec(function (err, tables) {
                        if (err) {
                            return next(err);
                        }
                        // Successful, so render.
                        res.render('status_form', {
                            title: 'Create Status',
                            errors: errors.array(),
                            tables: tables,
                            custom_err: "The table is already booked"
                        });
                    })
            } else {

                // Data from form is valid.
                status.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    // Successful - redirect to new record.
                    res.redirect(status.url);
                });
            }
        }
    }
];

// Display Status delete form on GET.
exports.status_delete_get = function (req, res) {
    res.render('status_form', {title: 'Create Status', tables: table.table_list});
};

// Handle Status delete on POST.
exports.status_delete_post = function (req, res) {

    res.send('NOT IMPLEMENTED: Status delete POST');
};

// Display Status update form on GET.
exports.status_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Status update GET');
};

// Handle Status update on POST.
exports.status_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Status update POST');
};