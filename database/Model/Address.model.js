const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class AdressModel extends Model {
	static get tableName() {
		return tableConstants.address_table
	}

	static get idColumn() {
		return 'address_id'
	}
}

module.exports = AdressModel
