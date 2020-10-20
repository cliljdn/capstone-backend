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
					contactnumber: '090783832454',
					profile_owner: 3,
				},
				{
					firstname: 'Wally',
					lastname: 'Bayola',
					middlename: 'Bulaga',
					age: '21',
					contactnumber: '090783837734',
					profile_owner: 4,
				},
				{
					firstname: 'Jose',
					lastname: 'Kamsuta',
					middlename: 'Okaylang',
					age: '21',
					contactnumber: '090783837734',
					profile_owner: 8,
				},
			])
		})
}
