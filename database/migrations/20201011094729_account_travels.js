const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */

exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.travel_history, function (table) {
		table.increments('travel_id').notNullable()
		table.string('destination')
		table
			.integer('account_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('cascade')
		table.timestamps(true, true)
	})

	await knex.schema.createTable(tableNames.companion_table, function (table) {
		table.increments('Companion_id').notNullable()
		table
			.integer('account_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('cascade')
		table
			.integer('travel_id')
			.unsigned()
			.index()
			.references('travel_id')
			.inTable(tableNames.travel_history)
			.onDelete('cascade')
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.companion_table)
	await knex.schema.dropTableIfExists(tableNames.travel_history)
}
