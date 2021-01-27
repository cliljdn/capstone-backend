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
					account_type: 'Individual',
					isActive: 1,
				},
				{
					email: 'graduating@gmail.com',
					password: pass,
					account_type: 'Individual',
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
					email: 'akolangto@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},
				{
					email: 'baronlangmalakas@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'sobranglakas@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'papasacapstone@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'kamustaangbuhay@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'poypoypoy@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'kamustakaokaylang@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'hoyhello@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'asanyungsabaw@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'hoybakitako@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},

				{
					email: 'malungkot@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},

				{
					email: 'hindikoalam@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},

				{
					email: 'okaysige@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},

				{
					email: 'ingatka@gmail.com',
					password: pass,
					account_type: 'Driver',
					isActive: 1,
				},

				{
					email: 'kamusta@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},
				{
					email: 'imokay@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'indibiningging@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'poyingpoy@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'japanvsusa@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},
			])
		})
}
