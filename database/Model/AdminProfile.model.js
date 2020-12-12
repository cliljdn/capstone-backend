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
		const AdminAddress = require('./AdminAddress.model')
		return {
			Address: {
				relation: Model.HasOneRelation,
				modelClass: AdminAddress,
				join: {
					from: tableConstants.admin_profile + '.admin_id',
					to: tableConstants.admin_address + '.address_owner',
				},
			},
		}
	}
}

module.exports = AdminProfile
