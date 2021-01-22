const TableNames = require('../../lib/contants/TableNames')

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(TableNames.references)
		.del()
		.then(function () {
			// Inserts seed entries

			return knex(TableNames.references).insert([
				{
					destination: '',
				},
			])
		})
}
