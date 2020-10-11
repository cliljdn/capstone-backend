const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.establishments)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.establishments).insert([
				{
					name: 'Jollibee Ulo ng apo',
					street: 'ulo ng apo olongapo city',
					telephone_number: '223-9020',
					establishment_owner: 'Donald khan',
					email: 'jollibeeulongapo@gmail.com',
				},
				{
					name: 'Mcdonald magsaysay drive',
					street: 'Magsaysay drive olongapo city',
					telephone_number: '223-8383',
					establishment_owner: 'Macdo',
					email: 'Mcdonaldmagsaysay@gmail.com',
				},
			])
		})
}
