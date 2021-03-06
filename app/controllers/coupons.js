// 'use strict';

var _ = require('lodash');
var md5 = require('md5');
var mongoose = require('mongoose');
var Coupon = mongoose.model('Coupon');

var cleanUpCoupon = function (coupon) {
	delete coupon['.id'];
	delete coupon['.v'];
	coupon.id = coupon.code; // to mirror Stripe API
	return coupon;
};

module.exports = {

	// List all Coupons
	list: function (req, res, next) {
		var searchQuery = {};
		Coupon.find(searchQuery, null, { sort: { code: 1 } }).lean().exec(function (err, coupons) {
			if (err) {
				return res.status(400).json(err);
			}
			else {
				_.forEach(coupons, cleanUpCoupon);
				return res.json(coupons);
			}
		});
	},

	// Show a Coupon
	read: function (req, res, next) {
		var searchQuery = {};
		if (req.params.id.indexOf('@') !== -1) {
			// TODO: make email search work
			//searchQuery.email = new RegExp(req.params.id, 'g');
		}
		else {
			searchQuery.code = req.params.id.toUpperCase();
		}
		// Send code 404 (Not Found) if not found, 412 (Precondition Failed) if found but not compliant, otherwise 400
		Coupon.find(searchQuery).lean().exec(function (err, coupons) {
			if (err) {
				return res.status(400).json(err);
			}
			else if (coupons.length === 0) {
				return res.status(404).json('Coupon not found');
			}
			else {
				return res.json(cleanUpCoupon(coupons[0]));
			}
		});
	},

	// Create new Coupon
	create: function (req, res, next) {
		var newCoupon = new Coupon(req.body);
		if (!newCoupon.code)
			newCoupon.code = md5(Date.now() + Math.random());
		newCoupon.code = newCoupon.code.toUpperCase();
		newCoupon.save(function (err) {
			if (err) {
				return res.status(400).json(err);
			}
			else {
				return res.json(cleanUpCoupon(newCoupon));
			}
		});
	},

	// Update a Coupon
	update: function (req, res, next) {
		Coupon.update(
			{ code: req.params.id.toUpperCase() },
			req.body,
			function (updateErr, numberAffected, rawResponse) {
				if (updateErr) {
					res.status(500).json(updateErr);
				}
				else {
					res.status(200).json('Updated coupon ' + req.params.id);
				}
			}
		);
	},

	// Delete a Coupon
	delete: function (req, res, next) {
		var searchQuery;
		if (req.params.id === 'ALL') {
			searchQuery = {};
		}
		else {
			searchQuery = { code: req.params.id.toUpperCase() };
		}
		Coupon.remove(
			searchQuery,
			function(couponErr, numberAffected, rawResponse) {
				if (couponErr) {
					res.status(500).json(couponErr);
				}
				else {
					res.status(200).json('Deleted ' + numberAffected + ' coupons');
				}
			}
		);
	}

};