const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class Establishments extends Model {
	static get tableName() {
		return tableConstants.establishments
	}

	static get idColumn() {
		return 'establishment_id'
	}

	static get relationMappings() {
		const EmployeeScanned = require('./EmployeeScanned.model')
		const Scanned = require('./EmployeeScanned.model')
		const Employees = require('./EmployeeProfile.model')
		return {
			Employees: {
				relation: Model.HasManyRelation,
				modelClass: Employees,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					to: tableConstants.employee_profile + '.working_in',
				},
			},
		}
	}
}
module.exports = Establishments
