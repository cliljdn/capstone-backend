const tableConstants = require('../../lib/contants/TableNames')
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tableConstants.employee_scanned)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(tableConstants.employee_scanned).insert([
				{
					batch: '20201212231',
					firstname: 'Calil',
					middlename: 'Christopher',
					lastname: 'Jaudian',
					contact_number: '09078382454',
					address: 'Blk 7 Lot 16 Sta.Monica Subdivision',
					employee_id: 5,
					parent_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'Isidro',
					middlename: 'John',
					lastname: 'Carlo',
					contact_number: '09048382454',
					address: 'Blk 7 Lot 16 Sta.Monica Subdivision',
					employee_id: 5,
					parent_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'Rich',
					middlename: 'In',
					lastname: 'Love',
					contact_number: '09023382454',
					address: 'Blk 7 Lot 16 Sta.Monica Subdivision',
					employee_id: 5,
					parent_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212232',
					firstname: 'Charlene',
					middlename: 'Joy',
					lastname: 'Concha',
					contact_number: '09568382454',
					address: 'Blk 7 Lot 16 Sta.Monica Subdivision',
					employee_id: 6,
					parent_id: 2,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},
				{
					batch: '20201212232',
					firstname: 'Mary',
					middlename: 'Joy',
					lastname: 'Salde',
					contact_number: '09034382454',
					address: 'Blk 7 Lot 16 Sta.Monica Subdivision',
					employee_id: 5,
					parent_id: 2,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},
			])
		})
}
