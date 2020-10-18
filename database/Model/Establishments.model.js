const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class Establishments extends Model {
	static get tableName() {
		return tableConstants.establishments
	}

	static get idColumn() {
		return 'establishment_id'
	}

	static get relationMappings() {
		const Employees = require('./account_table.model')
		return {
			Employees: {
				relation: Model.HasManyRelation,
				modelClass: Employees,
				join: {
					from: tableConstants.establishments + '.establishment_id',
					to: tableConstants.accounts_table + '.working_in',
				},
			},
		}
	}
}
module.exports = Establishments
