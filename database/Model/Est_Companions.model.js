const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')
const EmployeeScanned = require('./EmployeeScanned.model')

class EstCompanions extends Model {
	static get tableName() {
		return tableConstants.est_companions
	}

	static get idColumn() {
		return 'est_comp_id'
	}

	static get relationMappings() {
		const Establishments = require('./Establishments.model')
		const UserProfile = require('./UserProfile.model')
		return {
			EstLog: {
				relation: Model.ManyToManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableConstants.est_companions + '.users_id',
					through: {
						from: tableConstants.employee_scanned + '.users_id',
						to: tableConstants.employee_scanned + '.users_id',
					},
					to: tableConstants.user_profile + '.user_id',
				},
			},

			EstEnterd: {
				relation: Model.BelongsToOneRelation,
				modelClass: Establishments,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					to: tableConstants.est_companions + '.est_id',
				},
			},
		}
	}
}

module.exports = EstCompanions
