const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')
/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.establishments, function (table) {
		table.increments('est_id').notNullable()
		table.string('name')
		table.string('street')
		table.string('telephone_number')
		table.string('est_owner')

		table
			.integer('account_id')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.user_profile, function (table) {
		table.increments('user_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.date('birthday')
		table.string('contactnumber')
		table.specificType('image', 'longtext')

		table.string('position').nullable()

		table
			.integer('account_id')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.address_table, function (table) {
		table.increments('address_id').notNullable()
		table.string('house_lot_number')
		table.string('barangay')
		table.string('city')
		table
			.integer('account_id')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.vehicle_table, function (table) {
		table.string('plate_number').primary().notNullable()
		table.string('color')
		table.string('vehicle_type')
		table.string('body_number')
		table.string('vehicle_route')
		table.boolean('isActive')
		table
			.integer('account_id')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.employee_sched, function (table) {
		table.increments('sched_id').notNullable()

		table
			.integer('user_id')
			.unsigned()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('CASCADE')
			.index()

		table.time('time_in')
		table.time('time_out')
		table.date('date_occur')
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.employee_sched)
	await knex.schema.dropTableIfExists(tableNames.address_table)
	await knex.schema.dropTableIfExists(tableNames.vehicle_table)
	await knex.schema.dropTableIfExists(tableNames.user_profile)
	await knex.schema.dropTableIfExists(tableNames.establishments)
}
