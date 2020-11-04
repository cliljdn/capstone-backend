const tableConstants = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableConstants.employee_address)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableConstants.employee_address).insert([
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
			])
		})
}
