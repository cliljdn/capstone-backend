const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.vehicle_table)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.vehicle_table).insert([
				{
					plate_number: 'TXUU2',
					vehicle_route: 'Magsaysay',
					body_number: '2214',
					isActive: true,
					account_id: 14,
				},

				{
					plate_number: 'PX223',
					vehicle_route: 'Kessing',
					body_number: '2215',
					isActive: true,
					account_id: 15,
				},
			])
		})
}
