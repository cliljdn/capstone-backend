<<<<<<< HEAD
const tableNames = require('../../lib/contants/TableNames')
=======
const tableNames = require("../../lib/contants/TableNames");
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.user_profile)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.user_profile).insert([
				{
<<<<<<< HEAD
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
					firstname: 'Joey',
					lastname: 'Deleon',
					middlename: 'rawr',
					age: '33',
					contactnumber: '090783832454',
=======
					firstname: "Joshua",
					lastname: "ginaling",
					middlename: "ngan",
					birthday: "1997-03-12",
					contactnumber: "090783832454",
					profile_owner: 1,
				},
				{
					firstname: "Yuu",
					lastname: "Asakura",
					middlename: "hau",
					birthday: "1997-03-12",
					contactnumber: "090783837734",
					profile_owner: 2,
				},
				{
					firstname: "Joey",
					lastname: "Deleon",
					middlename: "rawr",
					birthday: "1997-03-12",
					contactnumber: "090783832454",
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					profile_owner: 3,
					isDriver: true,
				},
				{
<<<<<<< HEAD
					firstname: 'Yuu',
					lastname: 'Asakura',
					middlename: 'hau',
					age: '22',
					contactnumber: '090783837734',
=======
					firstname: "Yuu",
					lastname: "Asakura",
					middlename: "hau",
					birthday: "1997-03-12",
					contactnumber: "090783837734",
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					profile_owner: 4,
					isDriver: true,
				},
				{
<<<<<<< HEAD
					firstname: 'Ester',
					lastname: 'Mamamril',
					middlename: 'heeeeo',
					age: '22',
					contactnumber: '090783837734',
=======
					firstname: "Ester",
					lastname: "Mamamril",
					middlename: "heeeeo",
					birthday: "1997-03-12",
					contactnumber: "090783837734",
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
					profile_owner: 7,
					isDriver: true,
				},
				{
<<<<<<< HEAD
					firstname: 'Greg',
					lastname: 'Holt',
					middlename: 'hau',
					age: '22',
					contactnumber: '090783837734',
					profile_owner: 8,
				},
			])
		})
}
=======
					firstname: "Greg",
					lastname: "Holt",
					middlename: "hau",
					birthday: "1997-03-12",
					contactnumber: "090783837734",
					profile_owner: 8,
				},
			]);
		});
};
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
