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
				//7
				{
					email: 'baronlangmalakas@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},
				//8
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

				//20
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

				//24 ++
				{
					email: 'heiswe@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'parokyaniedgar@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'markjayson@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'warnakulahewa@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},

				{
					email: 'scanscancan@gmail.com',
					password: pass,
					account_type: 'Individual',
					isActive: 1,
				},
				//29 ++

				{
					email: 'julies@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'southstar@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mongotinapay@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'dunkindonut@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'highgrounds@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mineski@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'teencee@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'kukupalad@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'ravencarry@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'gabbidota@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mineskijessie@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mineskivash@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mrdonut@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'cocomelon@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'mrlemon@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'happycup@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'dairyqueen@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'zagu@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'playstation@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},

				{
					email: 'datablitz@gmail.com',
					password: pass,
					account_type: 'Establishment',
					isActive: 1,
				},
			])
		})
}
