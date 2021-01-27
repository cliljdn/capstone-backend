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
					vehicle_route: 'Magsaysay',
					body_number: '2214',
					isActive: true,
					account_id: 3,
				},
				{
					plate_number: 'PX223',
					color: 'Red',
					vehicle_route: 'Kessing',
					body_number: '2215',
					isActive: true,
					account_id: 3,
				},

				{
					plate_number: 'PX224',
					color: 'black',
					vehicle_route: 'sta.rita',
					body_number: '12313',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX22wew3',
					color: 'hahaha',
					vehicle_route: 'poland',
					body_number: '2322',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX221233',
					color: 'ThirtyFour',
					vehicle_route: 'japan',
					body_number: '53543',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX24423',
					color: 'rainbow',
					vehicle_route: 'launion',
					body_number: '12312',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX244323',
					color: 'Grey',
					vehicle_route: 'kamote',
					body_number: '4442',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX2244423',
					color: 'Violet',
					vehicle_route: 'gago ka',
					body_number: '2233',
					isActive: false,
					account_id: 3,
				},

				{
					plate_number: 'PX2223',
					color: 'Red',
					vehicle_route: 'sana pumasa',
					body_number: '2216',
					isActive: false,
					account_id: 3,
				},
			])
		})
}
