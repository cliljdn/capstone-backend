const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class Establishment extends Model {
	static get tableName() {
		return tableConstants.establishments
	}

	static get idColumn() {
		return 'est_id'
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')

		return {}
	}
}

module.exports = Establishment
