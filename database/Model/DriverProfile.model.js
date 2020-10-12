const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class DriverProfile extends Model {
	static get tableName() {
		return tableNames.driver_profile
	}

	static get idColumn() {
		return 'driver_id'
	}
}

module.exports = DriverProfile
