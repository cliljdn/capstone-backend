const bcrypt = require('bcrypt')
const hash = bcrypt.hashSync('Kamusta29', 10)
const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.admin_accounts)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.admin_accounts).insert([
				{
					email: 'bakacalilyan@gmail.com',
					password: hash,
					isActive: 1,
				},
				{
					email: 'hello@gmail.com',
					password: hash,
					isActive: 1,
				},
				{
					email: 'kumusta@gmail.com',
					password: hash,
					isActive: 1,
				},
				{
					email: 'urongsulong@gmail.com',
					password: hash,
					isActive: 1,
				},
				{
					email: 'kiyoyaneh@gmail.com',
					password: hash,
					isActive: 1,
				},
			])
		})
}
