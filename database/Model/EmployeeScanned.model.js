const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableNames.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}

	static get modifiers() {
		return {
			timeStamps(builder) {
				builder.select('time_entered', 'date_entered', 'pass_id')
			},
		}
	}

	static get relationMappings() {
		const TravelHistory = require('./TravelHistory.model')
		const UserProfile = require('./UserProfile.model')
		const Establishments = require('./Establishments.model')
		return {
			showEst: {
				relation: Model.HasManyRelation,
				modelClass: Establishments,
				join: {
					from: tableNames.employee_scanned + '.est_id',
					to: tableNames.establishments + '.establishment_id',
				},
			},
			showUsers: {
				relation: Model.HasManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.employee_scanned + '.users_id',
					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}

	$beforeInsert() {
		this.time_entered = new Date().toISOString()
		this.date_entered = new Date().toISOString()
	}
}

module.exports = EmployeeScanned
