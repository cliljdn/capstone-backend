const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class DriverProfile extends Model {
	static get tableName() {
		return tableNames.driver_profile
	}
}

module.exports = DriverProfile
