const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class locationsSuggest extends Model {
	static get tableName() {
		return tableNames.locations
	}
}

module.exports = locationsSuggest
