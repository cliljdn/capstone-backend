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
					birthday: '1997-03-12',
					contactnumber: '090783832454',
					profile_owner: 1,
				},
				{
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					profile_owner: 2,
				},
				{
					firstname: 'Joey',
					lastname: 'Deleon',
					middlename: 'rawr',
					birthday: '1997-03-12',
					contactnumber: '090783832454',
					profile_owner: 3,
				},
				{
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					profile_owner: 4,
				},
				{
					firstname: 'Ester',
					lastname: 'Mamamril',
					middlename: 'heeeeo',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					profile_owner: 5,
				},
				{
					firstname: 'Greg',
					lastname: 'Holt',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
				},
			])
		})
}
