const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.employee_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.employee_profile).insert([
				{
					firstname: 'Amidamaru',
					lastname: 'Suminab',
					middlename: 'kha',
					age: '23',
					address: '18th street west bajac',
					contactnumber: '090783441232',
					profile_owner: 5,
					working_in: 1,
				},
				{
					firstname: 'Yohan',
					lastname: 'Wisdom',
					middlename: 'Edolmo',
					age: '21',
					address: '18th street tolome',
					contactnumber: '090783821313',
					profile_owner: 4,
					profile_owner: 6,
					working_in: 2,
				},
			])
		})
}
