var Table = require('../models/table');
const { body,validationResult } = require('express-validator');

// Показать список всех столов.
exports.table_list = function(req, res, next) {

    Table.find({}, ['numberTable', 'numberOfSeats'])
        .exec(function (err, table_list) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('table_list', { title: 'table List', table_list: table_list });
        });

};

// Показать подробную страницу для данного стола.
exports.table_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Table detail: ' + req.params.id);
};

// Показать форму создания стола по запросу GET.
exports.table_create_get = function(req, res) {
    res.render('table_form', { title: 'Create Table'});
};

// Создать стол по запросу POST.
exports.table_create_post = [

    // Validate and sanitize fields.
    body('numberTable').trim().isLength({ min: 1 }).escape().withMessage('table must be specified.')
        .isNumeric().withMessage('table has non-numeric characters.'),
    body('numberOfSeats').trim().isLength({ min: 1 }).escape().withMessage('table must be specified.')
        .isNumeric().withMessage('table has non-numeric characters.'),

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

// Показать форму удаления стола по запросу GET.
exports.table_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete GET');
};

// Удалить стол по запросу POST.
exports.table_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete POST');
};

// Показать форму обновления стола по запросу GET.
exports.table_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table update GET');
};

// Обновить стол по запросу POST.
exports.table_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table update POST');
};