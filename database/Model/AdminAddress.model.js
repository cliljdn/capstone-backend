const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class AdminAddress extends Model {
	static get tableName() {
		return tableConstants.admin_address
	}

	static get idColumn() {
		return 'address_id'
	}
}

module.exports = AdminAddress
