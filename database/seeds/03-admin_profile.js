const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.admin_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.admin_profile).insert([
				{
					firstname: 'Joshua',
					lastname: 'yao',
					middlename: 'Bingat',
					age: '33',
					address: '18th street kessing',
					contactnumber: '090783832454',
					profile_owner: 1,
				},
				{
					firstname: 'Isidro',
					lastname: 'John',
					middlename: 'Carlo',
					age: '22',
					address: '18th street delphin',
					contactnumber: '090783837734',
					profile_owner: 2,
				},
				{
					firstname: 'Christian',
					lastname: 'Lee',
					middlename: 'Arcigal',
					age: '23',
					address: '18th street west bajac',
					contactnumber: '090783441232',
					profile_owner: 3,
				},
				{
					firstname: 'Denzil',
					lastname: 'Delos',
					middlename: 'Santos',
					age: '21',
					address: '18th street tolome',
					contactnumber: '090783821313',
					profile_owner: 4,
				},
				{
					firstname: 'Paulo',
					lastname: 'John',
					middlename: 'Edolmo',
					age: '20',
					address: '18th street bulacan',
					contactnumber: '09078323434',
					profile_owner: 5,
				},
			])
		})
}
