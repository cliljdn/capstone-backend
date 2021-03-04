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
					account_id: 1,
				},

				{
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 2,
				},
				{
					firstname: 'Joey',
					lastname: 'Deleon',
					middlename: 'rawr',
					birthday: '1997-03-12',
					contactnumber: '090783832454',
					account_id: 3,
				},
				{
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 4,
				},
				{
					firstname: 'Ester',
					lastname: 'Mamamril',
					middlename: 'heeeeo',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 5,
				},

				{
					firstname: 'Greg',
					lastname: 'Holt',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 6,
				},

				{
					firstname: 'Josh',
					lastname: 'haha',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 7,
				},
				{
					firstname: 'brylle',
					lastname: 'ako',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 8,
				},
				{
					firstname: 'gleason',
					lastname: 'Holt',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 9,
				},
				{
					firstname: 'Kamote',
					lastname: 'kaba',
					middlename: 'hindi no',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 10,
				},

				{
					firstname: 'okay sige',
					lastname: 'kamusta',
					middlename: 'okaynaman',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 11,
				},

				{
					firstname: 'walangmagawa',
					lastname: 'bakit',
					middlename: 'tamad',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 12,
				},

				{
					firstname: 'wowie',
					lastname: 'four',
					middlename: 'wsdad',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 13,
				},

				{
					firstname: 'wanpipti',
					lastname: 'open',
					middlename: 'nyaw',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 14,
				},

				{
					firstname: 'wowow',
					lastname: 'ngaleng',
					middlename: 'goods',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 15,
				},

				{
					firstname: 'datwo',
					lastname: 'kamot',
					middlename: 'hau',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 16,
				},

				{
					firstname: 'talaga',
					lastname: 'ohyesdaddy',
					middlename: 'has',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 17,
				},

				{
					firstname: 'something32',
					lastname: 'pompi',
					middlename: 'hapowpowu',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 18,
				},

				{
					firstname: 'qeqne',
					lastname: 'poity',
					middlename: 'sasasa',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 25,
				},

				{
					firstname: 'eren',
					lastname: 'yaeger',
					middlename: 'opik',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 26,
				},

				{
					firstname: 'uninszs',
					lastname: 'yunixs',
					middlename: 'poytqw',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 27,
				},

				{
					firstname: 'petiks',
					lastname: 'bagsak',
					middlename: 'tanga',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 28,
				},

				{
					firstname: 'petiks',
					lastname: 'bagsak',
					middlename: 'tanga',
					birthday: '1997-03-12',
					contactnumber: '090783837734',
					account_id: 29,
				},
			])
		})
}
