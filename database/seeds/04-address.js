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
					account_id: 1,
				},
				{
					house_lot_number: 'Blk 34 lot 16',
					barangay: 'Sto.Sitio',
					city: 'Olongapo',
					account_id: 2,
				},
				{
					house_lot_number: 'Blk 64 lot 16',
					barangay: 'Sto.Gapo',
					city: 'Olongapo',
					account_id: 3,
				},
				{
					house_lot_number: 'Blk 8 lot 16',
					barangay: 'Banicain',
					city: 'Olongapo',
					account_id: 4,
				},
				{
					house_lot_number: 'Blk 9 lot 16',
					barangay: 'West bajac bajac',
					city: 'Olongapo',
					account_id: 5,
				},
				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 6,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 7,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 8,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 9,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 10,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 11,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 12,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 13,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 14,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 15,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 16,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 17,
				},

				{
					house_lot_number: 'Blk 2 lot 16',
					barangay: 'East bajac bajac',
					city: 'Olongapo',
					account_id: 18,
				},
			])
		})
}
