const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Companions extends Model {
	static get tableName() {
		return tableNames.companion_table
	}
	static get idColumn() {
		return 'Companion_id'
	}

	static get relationMappings() {
		const EmployeeScanned = require('./EmployeeScanned.model')
		const UserProfile = require('./UserProfile.model')
		return {
			try: {
				relation: Model.HasManyRelation,
				modelClass: EmployeeScanned,
				join: {
					from: tableNames.companion_table + '.travel_id',
					to: tableNames.employee_scanned + '.pass_id',
				},
			},

			showUsers: {
				relation: Model.HasManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.companion_table + '.users_id',
					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}
}

module.exports = Companions
