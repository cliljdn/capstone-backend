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
					color: 'Yellow',
					vehicle_type: 'Jeepney',
					body_number: '2214',
					isActive: true,
					vehicle_owner: 3,
				},
				{
					plate_number: 'PX223',
					color: 'Red',
					vehicle_type: 'Jeepney',
					body_number: '2215',
					isActive: true,
					vehicle_owner: 4,
				},
				{
					plate_number: 'PX223',
					color: 'Blue',
					vehicle_type: 'Tricycle',
					body_number: '2213',
					isActive: true,
					vehicle_owner: 5,
				},
			])
		})
}
