const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableNames.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}
}

module.exports = EmployeeScanned
