const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')
/**
 *
 * @param {Knex} knex
 */

exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.passengers, function (table) {
		table.increments('passenger_id').notNullable()
		table.string('destination')
		table
			.integer('driver_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table
			.integer('users_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table
			.integer('vehicle_used')
			.unsigned()
			.index()
			.references('vehicle_id')
			.inTable(tableNames.vehicle_table)
			.onDelete('cascade')

		table
			.integer('parent_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table.time('time_boarded')

		table.date('date_boarded')
	})

	await knex.schema.createTable(tableNames.employee_scanned, function (table) {
		table.increments('scanned_id').notNullable()

		table
			.integer('employee_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')
		table
			.integer('est_id')
			.unsigned()
			.index()
			.references('establishment_id')
			.inTable(tableNames.establishments)
			.onDelete('cascade')

		table
			.integer('companion_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')
		table
			.integer('parent_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
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
	await knex.schema.dropTableIfExists(tableNames.passengers)
}
