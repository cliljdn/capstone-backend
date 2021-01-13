const { Model } = require('objection')
const tableConstants = require('../../lib/contants/TableNames')

class EmployeeScanned extends Model {
	static get tableName() {
		return tableConstants.employee_scanned
	}

	static get idColumn() {
		return 'scanned_id'
	}

	static get relationMappings() {
		const Establishment = require('./establishment.model')

		return {
			estList: {
				relation: Model.HasOneRelation,
				modelClass: () => Establishment,
				join: {
					from: tableConstants.employee_scanned + '.employee_id',
					to: tableConstants.establishments + '.account_id',
				},
			},
		}
	}
}

module.exports = EmployeeScanned
