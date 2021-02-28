require('dotenv').config()
// Update with your config settings.
module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			database: 'capstonedb',
			user: 'root',
			pass: '',
			// user: 'cliljdn',
			// password: 'jaudian29',
			timezone: 'UTC',
			dateStrings: true,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},

	production: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			database: 'capstonedb',
			user: 'cliljdn',
			password: 'jaudian29',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
}
