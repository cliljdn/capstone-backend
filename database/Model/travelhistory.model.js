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
		const UserProfile = require('./UserProfile.model')
		const Vechicle = require('./Vehicle.model')
		return {
			passengerInfo: {
				relation: Model.HasOneRelation,
				modelClass: () => UserProfile,
				join: {
					from: this.tableName + '.account_id',
					to: tableNames.user_profile + '.account_id',
				},
			},

			currentVehicle: {
				relation: Model.HasOneRelation,
				modelClass: () => Vechicle,
				join: {
					from: this.tableName + '.plate_number',
					to: tableNames.vehicle_table + '.plate_number',
				},
			},
		}
	}
}

module.exports = TravelHistory
