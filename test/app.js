// 'use strict';


var test = require('tape');
var request = require('supertest');


test('Correct coupons returned', function (t) {
	var app = require('../app/app');
	request(app)
	.get('/api/coupons?password=' + process.env.API_PASSWORD)
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function (err, res) {
		t.error(err, 'No error');
		t.ok(res.body.length, 'Returned coupons list');
		t.ok(res.body[0].code, 'Coupon #0 existed');
		//t.same(res.body, expectedUsers, 'Users as expected');
		t.end();
		app.closeDatabase();
	});
});

