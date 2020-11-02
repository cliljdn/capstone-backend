const tableConstants = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableConstants.admin_address)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableConstants.admin_address).insert([
				{
					house_lot_number: 'Blk 12 lot 16',
					barangay: 'Sto.Thomas',
					city: 'Olongapo',
					address_owner: 1,
				},
				{
					house_lot_number: 'Blk 9 lot 16',
					barangay: 'Sto.Sitio',
					city: 'Olongapo',
					address_owner: 2,
				},
				{
					house_lot_number: 'Blk 67 lot 16',
					barangay: 'Sto.Gapo',
					city: 'Olongapo',
					address_owner: 3,
				},
				{
					house_lot_number: 'Blk 45 lot 16',
					barangay: 'Banicain',
					city: 'Olongapo',
					address_owner: 4,
				},
				{
					house_lot_number: 'Blk 34 lot 16',
					barangay: 'West bajac bajac',
					city: 'Olongapo',
					address_owner: 5,
				},
			])
		})
}
