const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class UserProfile extends Model {
	static get tableName() {
		return tableNames.user_profile
	}
}

module.exports = UserProfile
