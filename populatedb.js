#! /usr/bin/env node

//console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Table = require('./models/table')
var Menu = require('./models/menuDish')
var TableStatus = require('./models/tableStatus')
var Waiters = require('./models/waiters')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tables = []
var menu = []
var tablesStatus = []
var waiters = []

function tableCreate(num_table, num_seats, cb) {

    var table = new Table({numberTable: num_table, numberOfSeats: num_seats})
    table.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New table: ' + table);
        tables.push(table)
        cb(null, table)
    }  );
}

function tableStatusCreate(start, table, status, cb) {
    var tableStatusDetails = {status:status};
    if (table) tableStatusDetails.table = table
    if (start) tableStatusDetails.start = start

    var tableStatus = new TableStatus(tableStatusDetails)
    tableStatus.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New tableStatus: ' + tableStatus);
        tablesStatus.push(tableStatus)
        cb(null, tableStatus);
    }   );
}

function waitersCreate(name, photo, cb) {
    
    var waiter = new Waiters({nameWaiter:name, photo:photo});
    waiter.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New waiter: ' + waiter);
        waiters.push(waiter)
        cb(null, waiter)
    }  );
}


function menuCreate(nameDish, composition, cost, grams, cb) {

    var dish = new Menu({nameDish:nameDish, composition:composition, cost:cost, grams:grams});
    dish.save(function (err) {
        if (err) {
            console.log('ERROR CREATING menu: ' + dish);
            cb(err, null)
            return
        }
        console.log('New menu: ' + dish);
        menu.push(dish)
        cb(null, dish)
    }  );
}


function createTables(cb) {
    async.series([
            function(callback) {
                tableCreate(1, 2, callback);
            },
            function(callback) {
                tableCreate(2, 2, callback);
            },
            function(callback) {
                tableCreate(3, 4, callback);
            },
            function(callback) {
                tableCreate(4, 4, callback);
            },
            function(callback) {
                tableCreate(5, 6, callback);
            },
        ],
        // optional callback
        cb);
}


function createWaiters(cb) {
    async.parallel([
            function(callback) {
                waitersCreate('Bob','linkToPhoto1', callback);
            },
            function(callback) {
                waitersCreate("Jena", 'linkToPhoto2', callback);
            },
            function(callback) {
                waitersCreate("Lena", 'linkToPhoto3', callback);
            },
            function(callback) {
                waitersCreate("Steve", 'linkToPhoto4', callback);
            },
        ],
        // optional callback
        cb);
}


function createtableStatus(cb) {
    async.parallel([
            function(callback) {
                tableStatusCreate('2022-01-22T09:00:00', tables[0], 'Busy after lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-22T11:00:00', tables[0], 'Busy after lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-22T15:00:00', tables[1], 'Busy before lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-23T17:30:00', tables[2], 'Busy before lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-21T17:30:00', tables[3], 'Busy before lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-20T15:30:00', tables[3], 'Busy before lunch', callback)
            },
            function(callback) {
                tableStatusCreate('2022-01-23T13:00:00', tables[4], 'Busy before lunch', callback)
            },
        ],
        // Optional callback
        cb);
}

function createMenu(cb) {
    async.parallel([
            function(callback) {
                menuCreate('steak','beef, spices, salt', 400.50, '400 grams', callback);
            },
            function(callback) {
                menuCreate("roast potatoes", 'potatoes, spices, salt', 155.60, '250 grams', callback);
            },
            function(callback) {
                menuCreate("breaded chicken", 'chicken, spices, salt, breadcrumbs', 300.85, '300 grams', callback);
            },
            function(callback) {
                menuCreate("bolognese pasta", 'beef, pasta, thyme, sugar, onion, garlic, tomato, red wine', 200.25, '250 grams', callback);
            },
            function(callback) {
                menuCreate("fruits", 'apples, bananas, oranges, pears, peaches, berries', 250.50, '400 grams', callback);
            },
            function(callback) {
                menuCreate("tea", 'black tea, green tea, herbal tea, red tea', 65.00, '1000 ml', callback);
            },
            function(callback) {
                menuCreate("coffee", 'latte, cappuccino, espresso, americano, raf, flat white', 70.00, '200 ml', callback);
            },
            function(callback) {
                menuCreate("juice", 'apple, orange, multifruit, tomato, cherry', 67.99, '500 ml', callback);
            },
        ],
        // optional callback
        cb);
}



async.series([
        createWaiters,
        createTables,
        createMenu,
        createtableStatus
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('tablesStatus: '+tablesStatus);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



