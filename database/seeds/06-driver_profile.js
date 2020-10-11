const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.driver_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.driver_profile).insert([
				{
					firstname: 'Jose',
					lastname: 'Manalo',
					middlename: 'Eat',
					age: '33',
					address: '18th street kessing',
					contactnumber: '090783832454',
					profile_owner: 3,
				},
				{
					firstname: 'Wally',
					lastname: 'Bayola',
					middlename: 'Bulaga',
					age: '21',
					address: '18th street delphin',
					contactnumber: '090783837734',
					profile_owner: 4,
				},
			])
		})
}
