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
