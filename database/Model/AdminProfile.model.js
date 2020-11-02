const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class AdminProfile extends Model {
	static get tableName() {
		return tableConstants.admin_profile
	}
	static get idColumn() {
		return 'admin_id'
	}

	static get relationMappings() {
		return {
			Address: {
				relation: Model.HasOneRelation,
				modelClass: AdminAddress,
				join: {},
			},
		}
	}
}

module.exports = AdminProfile
