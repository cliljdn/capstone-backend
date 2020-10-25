const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableNames.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}

	static get relationMappings() {
		const TravelHistory = require('./TravelHistory.model')
		const UserProfile = require('./UserProfile.model')
		const Establishments = require('./Establishments.model')
		return {
			ListOfCompanion: {
				relation: Model.ManyToManyRelation,
				modelClass: TravelHistory,
				join: {
					from: tableNames.travel_history + '.user_id',
					through: {
						from: tableNames.employee_scanned + '.users_id',
						to: tableNames.employee_scanned + '.pass_id',
					},
					to: tableNames.travel_history + '.travel_id',
				},
			},
			CompanionsOfUser: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.employee_scanned + '.users_id',
					through: {
						from: tableNames.companion_table + '.parent_id',
						to: tableNames.companion_table + '.users_id',
					},
					to: tableNames.user_profile + '.user_id',
				},
			},

			NamesOfCompanions: {
				relation: Model.HasManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.employee_scanned + '.users_id',
					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}
}

module.exports = EmployeeScanned
