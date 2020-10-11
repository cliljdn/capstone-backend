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
		}
	}
}

module.exports = Accounts
