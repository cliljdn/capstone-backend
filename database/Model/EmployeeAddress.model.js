const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class EmployeeAddress extends Model {
	static get tableName() {
		return tableConstants.employee_address
	}

	static get idColumn() {
		return 'address_id'
	}
}

module.exports = EmployeeAddress
