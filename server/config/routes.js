var mongoose = require('mongoose');
var bicycles = require('../controllers/bicycles.js');
var users = require('../controllers/users.js');

module.exports = (app) => {
	app.post('/api/register', users.register);
	app.post('/api/login', users.login);
	app.get('/api/session', users.check_session);
	app.get('/api/logout', users.logout);
	app.get('/api/get_user', users.find);
	app.post('/api/new_bike_listing', bicycles.create);
	app.get('/api/all_bikes', bicycles.find_all);
	app.get('/api/user_bikes', bicycles.user_bikes);
	app.post('/api/update_bike/:bike_id', bicycles.update);
	app.delete('/api/delete_bike/:bike_id', bicycles.delete);
	app.get('/api/user_bike/:bike_user_id', users.findByBike);
}