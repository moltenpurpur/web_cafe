var Dish = require('../models/menuDish');
var async = require('async');
const validator = require('express-validator');

// Display list of all Dish.
exports.dish_list = function(req, res, next) {

    Dish.find({})
        .exec(function (err, dish_list) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('dish_list', { title: 'Menu', dish_list: dish_list });
        });

};

// Display detail page for a specific Dish.
exports.dish_detail = function(req, res, next) {

    async.parallel({
        dish: function(callback) {
            Dish.findById(req.params.id)
                .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.dish==null) { // No results.
            var err = new Error('Dish not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('dish_detail', { title: 'Dish Detail',
                                    dish : results.dish
        } );
    });

};

// Display Dish create form on GET.
exports.dish_create_get = function(req, res) {
    res.render('dish_form', { title: 'Create Dish' });
};

// Handle Dish create on POST.
exports.dish_create_post =  [

    // Validate that the name field is not empty.
    validator.body('nameDish', 'Dish name required').trim().isLength({ min: 1 }),
    validator.body('composition', 'composition of the dish').trim().isLength({min:1}),
    validator.body('cost', 'dish prise').isNumeric().withMessage('cost has non-numeric characters.'),
    validator.body('grams', 'quantity of the dish (grams, milliliters, pieces)').trim().isLength({min:1}),

    // Sanitize (escape) the name field.
    validator.sanitizeBody('nameDish').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var dish = new Dish(
            { nameDish: req.body.nameDish }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('dish_form', { title: 'Create Dish', dish: dish, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Dish.findOne({ 'nameDish': req.body.nameDish })
                .exec( function(err, found_dish) {
                    if (err) { return next(err); }

                    if (found_dish) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_dish.url);
                    }
                    else {

                        dish.save(function (err) {
                            if (err) { return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect(dish.url);
                        });

                    }

                });
        }
    }
];

// Display Dish delete form on GET.
exports.dish_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish delete GET');
};

// Handle Dish delete on POST.
exports.dish_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish delete POST');
};

// Display Dish update form on GET.
exports.dish_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish update GET');
};

// Handle Dish update on POST.
exports.dish_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish update POST');
};