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

		return {
			ListEst: {
				relation: Model.ManyToManyRelation,
				modelClass: () => UserProfile,

				join: {
					from: tableConstants.establishments + '.account_id',
					extra: ['batch', 'parent_id'],

					through: {
						// Person_Movie is the join table.
						from: tableConstants.employee_scanned + '.employee_id',

						to: tableConstants.employee_scanned + '.parent_id',
						extra: ['batch', 'parent_id'],
					},

					to: tableConstants.user_profile + '.account_id',
				},
			},
		}
	}
}

module.exports = Establishment
