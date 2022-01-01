/**
 * Application routes for REST
 */

// 'use strict';

var express = require('express');

module.exports = function (app, config) {

	var router = express.Router();
	app.use('/', router);

	// Controllers
	// var authController = require(config.root + '/app/controllers/auth');
	var couponsController = require(config.root + '/app/controllers/coupons');
	var discountsController = require(config.root + '/app/controllers/discounts');

	// Routes
	router.get('/api/coupons',  couponsController.list);
	router.get('/api/coupons/:id', couponsController.read);
	router.post('/api/coupons',  couponsController.create);
	// router.put('/api/coupons/:id', authController.isAuthenticated, couponsController.update);
	router.delete('/api/coupons/:id',  couponsController.delete);

	// router.get('/api/discounts', authController.isAuthenticated, discountsController.list);
	// router.get('/api/discounts/:id', authController.isAuthenticated, discountsController.read);
	// router.post('/api/discounts', authController.isAuthenticated, discountsController.create);
	// router.put('/api/discounts/:id', authController.isAuthenticated, discountsController.update);
	// router.delete('/api/discounts/:id', authController.isAuthenticated, discountsController.delete);

	//router.get('/', startController.index);

};