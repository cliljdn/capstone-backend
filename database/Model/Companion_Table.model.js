const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Companions extends Model {
	static get tableName() {
		return tableNames.companion_table
	}
	static get idColumn() {
		return 'Companion_id'
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')
		return {
			LoadProfile: {
				relation: Model.HasManyRelation,
				modelClass: UserProfile,
				join: {
					from: tableNames.companion_table + '.users_id',
					to: tableNames.user_profile + '.user_id',
				},
			},
		}
	}
}

module.exports = Companions
