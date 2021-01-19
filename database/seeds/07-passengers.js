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
					account_id: 1,
					time_boarded: '5:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212232',
					firstname: 'Charlene',
					lastname: 'concha',
					destination: 'Sm Downtown',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '2:23',
					date_boarded: '2020-12-12',
				},

				{
					batch: '20201212237',
					firstname: 'Charlene',
					lastname: 'demesa',
					destination: 'qeqew',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '4:23',
					date_boarded: '2020-12-13',
				},
				{
					batch: '20201212236',
					firstname: 'grey',
					lastname: 'fullbuster',
					destination: 'Sm sadasda',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '6:23',
					date_boarded: '2020-12-13',
				},
				{
					batch: '20201212239',
					firstname: 'natsu',
					lastname: 'dragon',
					destination: 'Sm wqeqes',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '8:23',
					date_boarded: '2020-12-13',
				},
				{
					batch: '202012122323',
					firstname: 'jellal',
					lastname: 'fernandez',
					destination: 'Sm Downtown',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '24:23',
					date_boarded: '2020-12-15',
				},
				{
					batch: '20201212234',
					firstname: 'denzil',
					lastname: 'delos santos',
					destination: 'South Star',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '12:23',
					date_boarded: '2020-12-13',
				},
				{
					batch: '20201212235',
					firstname: 'mama',
					lastname: 'mo',
					destination: 'jan lang',
					plate_number: 'PX223',
					driver_id: 4,
					account_id: 1,
					time_boarded: '13:23',
					date_boarded: '2020-12-14',
				},
			])
		})
}
