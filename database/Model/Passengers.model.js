const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Passengers extends Model {
	static get tableName() {
		return tableNames.passengers
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')
		return {
			NameOfPassenger: {
				relation: Model.HasManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.passengers + '.users_id',
					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}
}

module.exports = Passengers
