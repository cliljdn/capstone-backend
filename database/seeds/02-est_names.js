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
					email: 'jollibeeulongapo@gmail.com',
				},
				{
					name: 'Mcdonald magsaysay drive',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Macdo',
					email: 'Mcdonaldmagsaysay@gmail.com',
				},
				{
					name: 'Sm Downtown',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Henry Sy',
					email: 'smdowntown@gmail.com',
				},
				{
					name: 'Sm Central',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Henry Sy',
					email: 'smcentral@gmail.com',
				},
				{
					name: 'Sm Olongapo',
					street: 'Magsaysay',
					telephone_number: '223-223',
					est_owner: 'Henry Sy',
					email: 'smolongapo@gmail.com',
				},
			])
		})
}
