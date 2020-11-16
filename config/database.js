const globalConf = require('./global');

const databaseConf = {
	develop: {
		host: '127.0.0.1',
		port: '3306', //mysql: 3306 - postgres: 5432
		user: 'np_a_cockpit',
		password: 'np_a_cockpit',
		database: 'np_a_cockpit',
		dialect: 'mysql' //mysql or postgres
	},
	recette: {
		host: '127.0.0.1',
		port: '3306',
		user: 'np_a_cockpit',
		password: 'np_a_cockpit',
		database: 'np_a_cockpit',
		dialect: 'mysql'
	},
	production: {
		host: '127.0.0.1',
		port: '3306',
		user: 'np_a_cockpit',
		password: 'np_a_cockpit',
		database: 'np_a_cockpit',
		dialect: 'mysql'
	},
	tablet: {
		dialect: 'sqlite',
		// iOS
		// storage: process.env.CORDOVA_APP_DIR + '/../Library/LocalDatabase/np_a_cockpit.db'
		// ANDROID :
		storage: __dirname + '/np_a_cockpit.db'
	},
	docker: {
		host: process.env.DATABASE_IP || 'database',
		port: '3306',
		user: 'np_a_cockpit',
		password: 'np_a_cockpit',
		database: 'np_a_cockpit',
		dialect: 'mysql'
	},
	cloud: {
		host: process.env.DATABASE_IP || 'database',
		port: '3306',
		user: 'np_a_cockpit',
		password: 'np_a_cockpit',
		database: 'np_a_cockpit',
		dialect: 'mysql'
	}
}

module.exports = databaseConf[globalConf.env];