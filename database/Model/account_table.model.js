const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Accounts extends Model {
	static get tableName() {
		return tableNames.accounts_table
	}

	static get idColumn() {
		return 'account_id'
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')
		const AddressModel = require('./Address.model')
		return {
			UserProfile: {
				relation: Model.HasOneRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.user_profile + '.profile_owner',
				},
			},
			AccountAddress: {
				relation: Model.HasOneRelation,
				modelClass: AddressModel,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.address_table + '.address_owner',
				},
			},
		}
	}
}

module.exports = Accounts
