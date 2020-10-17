const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */

exports.up = async (knex) => {
	await knex.schema.createTable(tableNames.accounts_table, function (table) {
		table.increments('account_id').notNullable()
		table.string('email')
		table.string('password'), table.string('account_type')
		table.boolean('isActive')
		table.timestamps(true, true)
	})

	await knex.schema.createTable(tableNames.admin_accounts, function (table) {
		table.increments('admin_id').notNullable()
		table.string('email')
		table.string('password'), table.boolean('isActive')
		table.timestamps(true, true)
	})
}

/**
 *
 * @param {Knex} knex
 */
exports.down = async (knex) => {
	await knex.schema.dropTableIfExists(tableNames.admin_accounts)
	await knex.schema.dropTableIfExists(tableNames.accounts_table)
}
