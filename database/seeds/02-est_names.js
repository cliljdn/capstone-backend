const TableNames = require('../../lib/contants/TableNames')

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(TableNames.establishments)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(TableNames.establishments).insert([
				{
					name: 'Jollibee Ulo ng apo',
					street: 'ulo ng apo olongapo city',
					telephone_number: '223-9020',
					est_owner: 'Donald khan',
					account_id: 19,
				},

				{
					name: 'Mcdonald magsaysay drive',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Randy Gieg',
					account_id: 20,
				},

				{
					name: 'Greenwich',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Potier Potter',
					account_id: 21,
				},

				{
					name: 'Espada',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Liezel Hambing',
					account_id: 22,
				},

				{
					name: 'Shakeys',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Jeyzel Lapuz',
					account_id: 23,
				},

				{
					name: 'Angel Burger',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-83283',
					est_owner: 'Oslon Aslan',
					account_id: 24,
				},

				//29 ++

				{
					name: 'Zagu',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Harry Potter',
					account_id: 29,
				},

				{
					name: 'Mineski',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Cobus Potieger',
					account_id: 30,
				},

				{
					name: 'The net dot com',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-11231',
					est_owner: 'Dolphy Randy',
					account_id: 31,
				},

				{
					name: 'Mr.Donut',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-12313',
					est_owner: 'Ingram Ali',
					account_id: 32,
				},

				{
					name: 'Dunkin Donut',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-1231',
					est_owner: 'Menorhehe',
					account_id: 33,
				},

				{
					name: 'Forever21',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-123123',
					est_owner: 'Incubus Arullo',
					account_id: 34,
				},

				{
					name: 'Giyang Co.',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-12315',
					est_owner: 'Mendavile',
					account_id: 35,
				},

				{
					name: 'Payaman Retail',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-1232',
					est_owner: 'Team Kramer',
					account_id: 36,
				},

				{
					name: 'Viy Line',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-51515',
					est_owner: 'Oxford Kramer',
					account_id: 37,
				},

				{
					name: 'Dairy Queen',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Richie Horsie',
					account_id: 38,
				},

				{
					name: 'Pontalan',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-234',
					est_owner: 'Tito Joey',
					account_id: 39,
				},

				{
					name: 'Pay a Wash',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-23423',
					est_owner: 'Bossing Vic',
					account_id: 40,
				},

				{
					name: 'Lucky Water',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Christoff Manny',
					account_id: 41,
				},

				{
					name: 'Coke Retail',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Mendez Shaun',
					account_id: 42,
				},

				{
					name: 'Southstar',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Raffy Tulfo',
					account_id: 43,
				},

				{
					name: 'Beehive',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Erap Estrada',
					account_id: 44,
				},

				{
					name: 'MartOne',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Isko Moreno',
					account_id: 45,
				},

				{
					name: 'Choas',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Ed Sheeran',
					account_id: 46,
				},

				{
					name: 'Mansions',
					street: 'Ulo ng apo rotonda',
					telephone_number: '223-8383',
					est_owner: 'Oslam Mary',
					account_id: 47,
				},

				{
					name: 'Greenville',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Porty wan',
					account_id: 48,
				},
			])
		})
}
