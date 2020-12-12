const tableNames = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableNames.address_table)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableNames.address_table).insert([
				{
					house_lot_number: 'Blk 7 lot 16',
					barangay: 'Sto.Thomas',
					city: 'Olongapo',
					address_owner: 1,
				},
				{
					house_lot_number: 'Blk 34 lot 16',
					barangay: 'Sto.Sitio',
					city: 'Olongapo',
					address_owner: 2,
				},
				{
					house_lot_number: 'Blk 64 lot 16',
					barangay: 'Sto.Gapo',
					city: 'Olongapo',
					address_owner: 3,
				},
				{
					house_lot_number: 'Blk 8 lot 16',
					barangay: 'Banicain',
					city: 'Olongapo',
					address_owner: 4,
				},
				{
					house_lot_number: 'Blk 9 lot 16',
					barangay: 'West bajac bajac',
					city: 'Olongapo',
					address_owner: 7,
				},
				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					address_owner: 8,
				},
				// {
				// 	house_lot_number: 'Blk 15 lot 16',
				// 	barangay: 'Beacon',
				// 	city: 'Olongapo',
				// 	address_owner: 7,
				// },
				// {
				// 	house_lot_number: 'Blk 8 lot 16',
				// 	barangay: 'New kalalake',
				// 	city: 'Olongapo',
				// 	address_owner: 8,
				// },
			])
		})
}
