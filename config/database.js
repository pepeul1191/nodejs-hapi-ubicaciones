const Sequelize = require('sequelize');
const constants = require('./constants');

if(constants.data.ambiente == 'desarrollo'){
	const sequelize = new Sequelize('database', 'username', 'password', {
		//host: 'localhost',
		dialect: 'sqlite',
		pool: {
			 max: 5,
			 min: 0,
			 idle: 10000
		},
		storage: 'db/ubicaciones.db',
		define: {
			timestamps: false // true by default
		},
		logging: true,
	});
	exports.db = sequelize;
}

if(constants.data.ambiente == 'produccion'){
	const sequelize = new Sequelize('database', 'username', 'password', {
		//host: 'localhost',
		dialect: 'sqlite',
		pool: {
			 max: 5,
			 min: 0,
			 idle: 10000
		},
		storage: 'db/ubicaciones.db',
		define: {
			timestamps: false // true by default
		},
		logging: false,
	});
	exports.db = sequelize;
}
