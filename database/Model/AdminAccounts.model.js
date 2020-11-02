const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class AdminAccounts extends Model {
	static get tableName() {
		return tableConstants.admin_accounts
	}

	static get idColumn() {
		return 'admin_id'
	}

	static get relationMappings() {
		const AdminProfile = require('./AdminProfile.model')
		return {
			Profile: {
				relation: Model.HasOneRelation,
				modelClass: AdminProfile,
				join: {
					from: tableConstants.admin_accounts + '.admin_id',
					to: tableConstants.admin_profile + '.profile_owner',
				},
			},
		}
	}
}

module.exports = AdminAccounts
