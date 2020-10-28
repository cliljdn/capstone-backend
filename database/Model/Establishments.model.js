const { Model } = require('objection')
const { est_companions } = require('../../lib/contants/TableNames')
const tableConstants = require('../../lib/contants/TableNames')
const EstCompanions = require('./Est_Companions.model')
const UserProfile = require('./UserProfile.model')

class Establishments extends Model {
	static get tableName() {
		return tableConstants.establishments
	}

	static get idColumn() {
		return 'establishment_id'
	}

	static get relationMappings() {
		const EmployeeScanned = require('./EmployeeScanned.model')
		const Scanned = require('./EmployeeScanned.model')
		const Employees = require('./EmployeeProfile.model')
		return {
			Employees: {
				relation: Model.HasManyRelation,
				modelClass: Employees,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					to: tableConstants.employee_profile + '.working_in',
				},
			},

			Names: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableConstants.user_profile + '.user_id',
					through: {
						from: tableConstants.employee_scanned + '.est_id',
						to: tableConstants.employee_scanned + '.users_id',
					},
					to: tableConstants.establishments + '.establishment_id',
				},
			},

			GraphCompanions: {
				relation: Model.HasManyRelation,
				modelClass: EstCompanions,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					to: tableConstants.est_companions + '.est_id',
				},
			},

			UsersCompanions: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					through: {
						from: tableConstants.est_companions + '.est_id',
						to: tableConstants.est_companions + '.users_id',
						extra: {
							date_entered: 'date_created',
							time_entered: 'time_created',
						},
					},
					to: tableConstants.user_profile + '.user_id',
				},
			},
		}
	}
}
module.exports = Establishments
