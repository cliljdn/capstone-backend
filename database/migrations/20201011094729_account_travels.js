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
			.integer('user_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')
		table.boolean('isCompanion')

		table.time('time_created')

		table.date('date_created')
	})

	await knex.schema.createTable(tableNames.companion_table, function (table) {
		table.increments('Companion_id').notNullable()
		table
			.integer('users_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')
		table
			.integer('travel_id')
			.unsigned()
			.index()
			.references('travel_id')
			.inTable(tableNames.travel_history)
			.onDelete('cascade')
		table
			.integer('parent_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table.time('time_created')
		table.date('date_created')
	})

	await knex.schema.createTable(tableNames.passengers, function (table) {
		table.increments('passenger_id').notNullable()
		table
			.integer('driver_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')
		table
			.integer('travel_id')
			.unsigned()
			.index()
			.references('travel_id')
			.inTable(tableNames.travel_history)
			.onDelete('cascade')

		table
			.integer('users_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		// table
		// 	.integer('vehicle_used')
		// 	.unsigned()
		// 	.index()
		// 	.references('vehicle_id')
		// 	.inTable(tableNames.vehicle_table)
		// 	.onDelete('cascade')

		table.time('time_boarded')

		table.date('date_boarded')
	})

	await knex.schema.createTable(tableNames.employee_scanned, function (table) {
		table.increments('scanned_id').notNullable()

		table
			.integer('employee_id')
			.unsigned()
			.index()
			.references('employee_id')
			.inTable(tableNames.employee_profile)
			.onDelete('cascade')
		table
			.integer('est_id')
			.unsigned()
			.index()
			.references('establishment_id')
			.inTable(tableNames.establishments)
			.onDelete('cascade')

		table
			.integer('users_id')
			.unsigned()
			.index()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('cascade')

		table.time('time_entered')
		table.date('date_entered')
	})

	await knex.schema.createTable(tableNames.est_companions, function (table) {
		table.increments('est_comp_id').notNullable()

		table
			.integer('est_id')
			.unsigned()
			.index()
			.references('establishment_id')
			.inTable(tableNames.establishments)
			.onDelete('cascade')

		table
			.integer('users_id')
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

		table.time('time_created')

		table.date('date_created')
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.est_companions)
	await knex.schema.dropTableIfExists(tableNames.employee_scanned)
	await knex.schema.dropTableIfExists(tableNames.passengers)
	await knex.schema.dropTableIfExists(tableNames.companion_table)
	await knex.schema.dropTableIfExists(tableNames.travel_history)
}
