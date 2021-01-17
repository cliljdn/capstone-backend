const TableNames = require('../../lib/contants/TableNames')

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(TableNames.travel_history)
		.del()
		.then(function () {
			// Inserts seed entries
			return knex(TableNames.travel_history).insert([
				{
					batch: '20201212231',
					firstname: 'Calil',
					lastname: 'Jaudian',
					destination: 'Sm Central',
					plate_number: 'TXUU2',
					driver_id: 3,
					account_id: 1,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'John',
					lastname: 'carlo',
					destination: 'Sm Central',
					plate_number: 'TXUU2',
					driver_id: 3,
					account_id: 1,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212231',
					firstname: 'richin',
					lastname: 'love',
					destination: 'Sm Central',
					plate_number: 'TXUU2',
					driver_id: 3,
					account_id: 1,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212232',
					firstname: 'joy',
					lastname: 'salde',
					destination: 'Sm Downtown',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 2,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212232',
					firstname: 'Charlene',
					lastname: 'concha',
					destination: 'Sm Downtown',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 2,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},
			])
		})
}
