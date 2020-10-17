const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Companions extends Model {
	static get tableName() {
		return tableNames.companion_table
	}
	static get idColumn() {
		return 'Companion_id'
	}
}

module.exports = Companions
