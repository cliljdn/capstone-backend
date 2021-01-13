const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableConstants.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}
}

module.exports = EmployeeScanned
