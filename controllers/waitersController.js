var Waiter = require('../models/waiters');
const { body,validationResult } = require('express-validator');
const Table = require("../models/table");

// Display list of all Waiters.
exports.waiter_list = function(req, res, next) {

    Waiter.find({})
        .exec(function (err, waiter_list) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('waiter_list', { title: 'Waiters List', waiter_list: waiter_list });
        });

};

// Display detail page for a specific Waiter.
exports.waiter_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Waiter detail: ' + req.params.id);
};

// Display Waiter create form on GET.
exports.waiter_create_get = function(req, res) {
    res.render('table_form', { title: 'Create Table'});
};

// Handle Waiter creates on POST.
exports.waiter_create_post = [

    // Validate and sanitize fields.
    body('nameWaiter').trim().isLength({ min: 1 }).escape().withMessage('name must be specified.')
        .isAlpha().withMessage('name has non-alpha characters.'),
    body('photo').trim().isLength({ min: 1 }).escape().withMessage('table must be specified.')
        .isNumeric().withMessage('photo has non-alpha characters.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('table_form', { title: 'Create Table', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var table = new Table(
                {
                    numberTable: req.body.numberTable,
                    numberOfSeats: req.body.numberOfSeats,
                });
            table.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(table.url);
            });
        }
    }
];

// Display Waiter delete form on GET.
exports.waiter_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Waiter delete GET');
};

// Handle Waiter deletes on POST.
exports.waiter_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Waiter delete POST');
};

// Display Waiter update form on GET.
exports.waiter_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Waiter update GET');
};

// Handle Waiter updates on POST.
exports.waiter_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Waiter update POST');
};