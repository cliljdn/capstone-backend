<<<<<<< HEAD
const tableNames = require('../../lib/contants/TableNames')
=======
const tableNames = require("../../lib/contants/TableNames");
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.employee_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.employee_profile).insert([
				{
<<<<<<< HEAD
					firstname: 'Amidamaru',
					lastname: 'Suminab',
					middlename: 'kha',
					age: '23',
					contactnumber: '090783441232',
=======
					firstname: "Amidamaru",
					lastname: "Suminab",
					middlename: "kha",
					birthday: "12-03-1997",
					contactnumber: "090783441232",
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					profile_owner: 5,
					working_in: 1,
				},
				{
<<<<<<< HEAD
					firstname: 'Yohan',
					lastname: 'Wisdom',
					middlename: 'Edolmo',
					age: '21',
					contactnumber: '090783821313',
					profile_owner: 4,
					working_in: 2,
				},
			])
		})
}
=======
					firstname: "Yohan",
					lastname: "Wisdom",
					middlename: "Edolmo",
					birthday: "12-03-1997",
					contactnumber: "090783821313",
					profile_owner: 4,
					working_in: 2,
				},
			]);
		});
};
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
