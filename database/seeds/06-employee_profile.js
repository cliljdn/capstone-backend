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
					birthday: '12-03-1997',
					contactnumber: '090783441232',
					profile_owner: 5,
					working_in: 1,
				},
				{
					firstname: 'Yohan',
					lastname: 'Wisdom',
					middlename: 'Edolmo',
					birthday: '12-03-1997',
					contactnumber: '090783821313',
					profile_owner: 6,
					working_in: 2,
				},
			])
		})
}
