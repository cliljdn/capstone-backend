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
					account_id: 5,
				},
				{
					name: 'Mcdonald magsaysay drive',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					est_owner: 'Macdo',
					account_id: 6,
				},
			])
		})
}
