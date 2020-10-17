const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class TravelHistory extends Model {
	static get tableName() {
		return tableNames.travel_history
	}

	static get idColumn() {
		return 'travel_id'
	}

	static get relationMappings() {
		const Companions = require('./Companion_Table.model')
		return {
			Companions: {
				relation: Model.HasManyRelation,
				modelClass: Companions,
				join: {
					from: tableNames.travel_history + '.travel_id',
					to: tableNames.companion_table + '.travel_id',
				},
			},
		}
	}
}

module.exports = TravelHistory
