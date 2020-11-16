const globalConf = require('./global');

const mailConf = {
	develop: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'http://127.0.0.1:' + globalConf.port
	},
	recette: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'host'
	},
	production: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'host'
	},
	tablet: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'host'
	},
	docker: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'host'
	},
	cloud: {
		transport: {
			host: 'mail',
			port: 465,
			secure: true,
			auth: {
				user: '',
				pass: ''
			}
		},
		expediteur: 'enderocean App <no-reply@enderocean.com>',
		administrateur: 'Responsable enderocean <contact@enderocean.com>',
		host: 'host'
	}
}

module.exports = mailConf[globalConf.env];
