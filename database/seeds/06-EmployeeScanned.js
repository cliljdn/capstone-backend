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
					lastname: 'Jaudian',
					employee_id: 5,
					est_id: 1,
					account_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'Isidro',
					lastname: 'Carlo',
					employee_id: 5,
					est_id: 1,
					account_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'Rich',
					lastname: 'Love',
					est_id: 1,
					employee_id: 5,
					account_id: 1,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},

				{
					batch: '20201212232',
					firstname: 'Charlene',
					lastname: 'Concha',
					employee_id: 6,
					est_id: 2,
					account_id: 2,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},
				{
					batch: '20201212232',
					firstname: 'Mary',
					lastname: 'Salde',
					employee_id: 6,
					est_id: 2,
					account_id: 2,
					time_entered: '2:23',
					date_entered: '2020-12-12',
				},
			])
		})
}
