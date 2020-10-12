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
		const EmployeeProfile = require('./EmployeeProfile.model')
		const DriverProfile = require('./DriverProfile.model')
		const UserProfile = require('./UserProfile.model')
		const TravelHistory = require('./TravelHistory.model')
		const Companions = require('./Companion_Table.model')
		return {
			UserProfile: {
				relation: Model.HasOneRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.user_profile + '.profile_owner',
				},
			},

			DriverProfile: {
				relation: Model.HasOneRelation,
				modelClass: DriverProfile,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.driver_profile + '.profile_owner',
				},
			},

			EmployeeProfile: {
				relation: Model.HasOneRelation,
				modelClass: EmployeeProfile,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.employee_profile + '.profile_owner',
				},
			},

			TravelHistory: {
				relation: Model.HasManyRelation,
				modelClass: TravelHistory,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.travel_history + '.account_id',
				},
			},

			Companions: {
				relation: Model.HasManyRelation,
				modelClass: Companions,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.companion_table + '.account_id',
				},
			},
			ParentIdForCompanions: {
				relation: Model.HasOneRelation,
				modelClass: Companions,
				join: {
					from: tableNames.accounts_table + '.account_id',
					to: tableNames.companion_table + '.parentId',
				},
			},
		}
	}
}

module.exports = Accounts
