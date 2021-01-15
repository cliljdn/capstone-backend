const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')
/**
 *
 * @param {Knex} knex
 */

exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.travel_history, function (table) {
		table.increments('travel_id').notNullable()
		table.string('batch').notNullable()

		table.string('firstname').nullable()
		table.string('middlename').nullable()
		table.string('lastname').nullable()
		table.string('contact_number').nullable()
		table.string('address').nullable()

		table.string('destination')

		table
			.integer('driver_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('cascade')

		table
			.string('plate_number')
			.index()
			.references('plate_number')
			.inTable(tableNames.vehicle_table)
			.onDelete('cascade')

		table
			.integer('account_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('cascade')

		table.time('time_boarded')

		table.date('date_boarded')
	})

	await knex.schema.createTable(tableNames.employee_scanned, function (table) {
		table.increments('scanned_id').notNullable()
		table.string('batch').notNullable()

		table.string('firstname').nullable()
		table.string('middlename').nullable()
		table.string('lastname').nullable()
		table.string('contact_number').nullable()
		table.string('address').nullable()

		table
			.integer('employee_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table
			.integer('account_id')
			.unsigned()
			.index()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('cascade')

		table.time('time_entered')
		table.date('date_entered')
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.employee_scanned)
	await knex.schema.dropTableIfExists(tableNames.travel_history)
}
