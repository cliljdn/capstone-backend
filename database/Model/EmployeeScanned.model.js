const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableConstants.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}

	static get relationMappings() {
		const Establishment = require('./establishment.model')
		const UserProfile = require('./UserProfile.model')
		return {
			estList: {
				relation: Model.HasOneRelation,
				modelClass: () => Establishment,
				join: {
					from: tableConstants.employee_scanned + '.employee_id',
					to: tableConstants.establishments + '.account_id',
				},
			},

			scannedIndiv: {
				relation: Model.HasOneRelation,
				modelClass: () => UserProfile,
				join: {
					from: tableConstants.employee_scanned + '.account_id',
					to: tableConstants.user_profile + '.account_id',
				},
			},

			estName: {
				relation: Model.HasOneRelation,
				modelClass: () => Establishment,
				join: {
					from: tableConstants.employee_scanned + '.est_id',
					to: tableConstants.establishments + '.est_id',
				},
			},

			presentEmployee: {
				relation: Model.HasOneRelation,
				modelClass: () => UserProfile,
				join: {
					from: tableConstants.employee_scanned + '.employee_id',
					to: tableConstants.user_profile + '.user_id',
				},
			},

			// estInfo: {
			// 	relation: Model.HasOneRelation,
			// 	modelClass: () => Establishment,
			// 	join: {
			// 		from: tableConstants.employee_scanned + '.est_id',
			// 		to: tableConstants.establishments + '.est_id',
			// 	},
			// },
		}
	}
}

module.exports = EmployeeScanned
