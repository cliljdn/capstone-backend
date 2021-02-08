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
		table.specificType('image', 'longtext')
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
		table.boolean('isActive').defaultTo(true)
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

		table
			.integer('user_id')
			.unsigned()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.vehicle_table, function (table) {
		table.string('plate_number').primary().notNullable()
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

	await knex.schema.createTable(tableNames.vehicle_routes, function (table) {
		table.increments('route_id').notNullable()
		table.string('vr_routes')
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.vehicle_routes)
	await knex.schema.dropTableIfExists(tableNames.address_table)
	await knex.schema.dropTableIfExists(tableNames.vehicle_table)
	await knex.schema.dropTableIfExists(tableNames.user_profile)
	await knex.schema.dropTableIfExists(tableNames.establishments)
}
