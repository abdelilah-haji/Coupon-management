var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

var config = {

	development: {
		root: rootPath,
		app: {
			name: 'coupon-service'
		},
		port: 3014,
		db: 'mongodb://127.0.0.1:27017/test'
		
	},

	test: {
		root: rootPath,
		app: {
			name: 'coupon-service'
		},
		port: 3000,
		db: 'mongodb://127.0.0.1:27017/test'
		
	},

	production: {
		root: rootPath,
		app: {
			name: 'coupon-service'
		},
		port: 3000,
		db: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test'

	}

};

module.exports = config[env];