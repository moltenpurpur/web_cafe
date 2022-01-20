var express = require('express');
var router = express.Router();

// Требующиеся модули контроллеров.
var table_controller = require('../controllers/tableController');
var status_controller = require('../controllers/tableStatusController');
var dish_controller = require('../controllers/menuDishController');
var waiter_controller = require('../controllers/waitersController');


// GET catalog home page.
router.get('/', status_controller.index);

// GET request for creating a tableStatus. NOTE This must come before routes that display Book (uses id).
// GET запрос для создания статуса. Должен появиться до маршрута, показывающего книгу(использует id)
router.get('/tableStatus/create', status_controller.status_create_get);

// POST request for creating tableStatus.
router.post('/tableStatus/create', status_controller.status_create_post);

// GET request to delete tableStatus.
router.get('/tableStatus/:id/delete', status_controller.status_delete_get);

// POST request to delete tableStatus.
router.post('/tableStatus/:id/delete', status_controller.status_delete_post);

// GET request to update tableStatus.
router.get('/tableStatus/:id/update', status_controller.status_update_get);

// POST request to update tableStatus.
router.post('/tableStatus/:id/update', status_controller.status_update_post);

// GET request for one tableStatus.
router.get('/tableStatus/:id', status_controller.status_detail);

// GET request for list of all tableStatus items.
router.get('/tableStatus', status_controller.status_list);


// GET request for creating table. NOTE This must come before route for id (i.e. display author).
// GET-запрос для создания стола. Должен появиться до маршрута для id (для вывода автора)
router.get('/table/create', table_controller.table_create_get);

// POST request for creating table.
router.post('/table/create', table_controller.table_create_post);

// GET request to delete table.
router.get('/table/:id/delete', table_controller.table_delete_get);

// POST request to delete table.
router.post('/table/:id/delete', table_controller.table_delete_post);

// GET request to update table.
router.get('/table/:id/update', table_controller.table_update_get);

// POST request to update table.
router.post('/table/:id/update', table_controller.table_update_post);

// GET request for one table.
router.get('/table/:id', table_controller.table_detail);

// GET request for list of all tables.
router.get('/table', table_controller.table_list);


// GET request for creating a menuDish. NOTE This must come before route that displays Genre (uses id).
// GET-запрос для создания блюда. Должен появиться до маршрута, выводящего жанр (( с использованием id)
router.get('/menuDish/create', dish_controller.dish_create_get);

//POST request for creating menuDish.
router.post('/menuDish/create', dish_controller.dish_create_post);

// GET request to delete menuDish.
router.get('/menuDish/:id/delete', dish_controller.dish_delete_get);

// POST request to delete menuDish.
router.post('/menuDish/:id/delete', dish_controller.dish_delete_post);

// GET request to update menuDish.
router.get('/menuDish/:id/update', dish_controller.dish_update_get);

// POST request to update menuDish.
router.post('/menuDish/:id/update', dish_controller.dish_update_post);

// GET request for one menuDish.
router.get('/menuDish/:id', dish_controller.dish_detail);

// GET request for list of all menuDish.
router.get('/menuDish', dish_controller.dish_list);


// GET request for creating a waiters. NOTE This must come before route that displays BookInstance (uses id).
// GET-запрос для создания экземпляра официанта. Должен появиться до маршрута, выводящего BookInstance с использованием id
router.get('/waiters/create', waiter_controller.waiter_create_get);

// POST request for creating waiter.
router.post('/waiters/create', waiter_controller.waiter_create_post);

// GET request to delete waiter.
router.get('/waiters/:id/delete', waiter_controller.waiter_delete_get);

// POST request to delete waiter.
router.post('/waiters/:id/delete', waiter_controller.waiter_delete_post);

// GET request to update waiter.
router.get('/waiters/:id/update', waiter_controller.waiter_update_get);

// POST request to update waiter.
router.post('/waiters/:id/update', waiter_controller.waiter_update_post);

// GET request for one waiter.
router.get('/waiters/:id', waiter_controller.waiter_detail);

// GET request for list of all waiters.
router.get('/waiters', waiter_controller.waiter_list);

module.exports = router;