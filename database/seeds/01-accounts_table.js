const bcrypt = require('bcrypt')
const pass = bcrypt.hashSync('Jaudian29', 10)
const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.accounts_table)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.accounts_table).insert([
				{
					email: 'okaylangakoat@gmail.com',
					password: pass,
					account_type: 'User',
					isActive: 1,
				},
				{
					email: 'graduating@gmail.com',
					password: pass,
					account_type: 'User',
					isActive: 1,
				},
				{
					email: 'josemanalo@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},
				{
					email: 'nararahuyo@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},
				{
					email: 'kamusta@gmail.com',
					password: pass,
					account_type: 'Employee',
					isActive: 1,
				},
				{
					email: 'imokay@gmail.com',
					password: pass,
					account_type: 'Employee',
					isActive: 1,
				},
				{
					email: 'caliljaudiannn@gmail.com',
					password: pass,
					account_type: 'Employee',
					isActive: 1,
				},
			])
		})
}
