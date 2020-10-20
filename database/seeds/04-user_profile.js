const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.user_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.user_profile).insert([
				{
					firstname: 'Joshua',
					lastname: 'ginaling',
					middlename: 'ngan',
					age: '33',
					contactnumber: '090783832454',
					profile_owner: 1,
				},
				{
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					age: '22',
					contactnumber: '090783837734',
					profile_owner: 2,
				},
				{
					firstname: 'Greg',
					lastname: 'Holt',
					middlename: 'hau',
					age: '22',
					contactnumber: '090783837734',
					profile_owner: 9,
				},
			])
		})
}
