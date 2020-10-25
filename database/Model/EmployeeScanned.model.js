const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')
const TravelHistory = require('./TravelHistory.model')
const UserProfile = require('./UserProfile.model')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableNames.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}

	static get relationMappings() {
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
		}
	}
}

module.exports = EmployeeScanned
