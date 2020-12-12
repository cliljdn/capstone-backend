const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class EmployeeProfile extends Model {
	static get tableName() {
		return tableNames.employee_profile
	}
	static get idColumn() {
		return 'employee_id'
	}

	static get relationMappings() {
		const EmployeeScanned = require('./EmployeeScanned.model')
		const EmployeeAddress = require('./EmployeeAddress.model')
		return {
			GraphUsers: {
				relation: Model.HasOneRelation,
				modelClass: EmployeeScanned,
				join: {
					from: tableNames.employee_profile + '.employee_id',
					to: tableNames.employee_scanned + '.employee_id',
				},
			},

			Address: {
				relation: Model.HasOneRelation,
				modelClass: EmployeeAddress,
				join: {
					from: tableNames.employee_profile + '.employee_id',
					to: tableNames.employee_address + '.address_owner',
				},
			},
		}
	}
}

module.exports = EmployeeProfile
