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
		const EmployeeScanned = require('./EmployeeScanned.model')
		const Establishment = require('./establishment.model')
		return {
			UserProfile: {
				relation: Model.HasOneRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.user_profile + '.account_id',
				},
			},

			AccountAddress: {
				relation: Model.HasOneRelation,
				modelClass: AddressModel,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.address_table + '.account_id',
				},
			},

			ListEnteredEst: {
				relation: Model.BelongsToOneRelation,
				modelClass: EmployeeScanned,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.employee_scanned + '.account_id',
				},
			},

			EstProfile: {
				relation: Model.HasOneRelation,
				modelClass: Establishment,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.establishments + '.account_id',
				},
			},
			// Employee,
		}
	}
}

module.exports = Accounts
