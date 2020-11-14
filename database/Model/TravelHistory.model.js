const { Model } = require('objection')
const { companion_table } = require('../../lib/contants/TableNames')
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

			UsersCompanion: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.travel_history + '.travel_id',
					through: {
						from: tableNames.companion_table + '.travel_id',
						to: tableNames.companion_table + '.users_id',
						extra: {
							time_boarded: 'time_created',
							date_boarded: 'date_created',
						},
					},
					to: tableNames.user_profile + '.user_id',
				},
			},

			GoingTo: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.travel_history + '.travel_id',
					through: {
						from: tableNames.passengers + '.travel_id',
						to: tableNames.passengers + '.users_id',
						extra: {
							time_boarded: 'time_boarded',
							date_boarded: 'date_boarded',
						},
					},

					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}

	$beforeInsert() {
		this.time_created = new Date(0).toISOString()
		this.date_created = new Date().toISOString()
	}
}

module.exports = TravelHistory
