const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class EmployeeProfile extends Model {
	static get tableName() {
		return tableNames.employee_profile
	}
	static get idColumn() {
		return 'employee_id'
	}
}

module.exports = EmployeeProfile
