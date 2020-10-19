const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class TravelHistory extends Model {
	static get tableName() {
		return tableNames.travel_history
	}

	static get idColumn() {
		return 'travel_id'
	}

	static get relationMappings() {
		const Companions = require('./Companion_Table.model')
		const Passengers = require('./Passengers.model')
		const EmployeeScanned = require('./EmployeeScanned.model')
		return {
			Companions: {
				relation: Model.HasManyRelation,
				modelClass: Companions,
				join: {
					from: tableNames.travel_history + '.travel_id',
					to: tableNames.companion_table + '.travel_id',
				},

				GetTravelId: {
					relation: Model.HasManyRelation,
					modelClass: Passengers,

					join: {
						from: tableNames.travel_history + '.travel_id',
						to: tableNames.passengers + '.travel_id',
					},
				},
			},

			EstablishmentEntered: {
				relation: Model.HasManyRelation,
				modelClass: EmployeeScanned,
				join: {
					from: tableNames.travel_history + '.travel_id',
					to: tableNames.employee_scanned + '.pass_id',
				},
			},
		}
	}
}

module.exports = TravelHistory
