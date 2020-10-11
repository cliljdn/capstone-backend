const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')
/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.admin_profile, function (table) {
		table.increments('admin_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
		table.string('address')
		table.string('contactnumber')
		table.specificType('image', 'longblob')
		table
			.integer('profile_owner')
			.unsigned()
			.references('admin_id')
			.inTable(tableNames.admin_accounts)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.user_profile, function (table) {
		table.increments('user_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
		table.string('address')
		table.string('contactnumber')
		table.specificType('image', 'longblob')
		table
			.integer('profile_owner')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.driver_profile, function (table) {
		table.increments('driver_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
		table.string('address')
		table.string('contactnumber')
		table.specificType('image', 'longblob')
		table
			.integer('profile_owner')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.establishments, function (table) {
		table.increments('establishment_id').notNullable()
		table.string('name')
		table.string('street')
		table.string('telephone_number')
		table.string('establishment_owner')
		table.string('email')
	})

	await knex.schema.createTable(tableNames.employee_profile, function (table) {
		table.increments('employee_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
		table.string('address')
		table.string('contactnumber')
		table.string('position')
		table.specificType('image', 'longblob')
		table
			.integer('profile_owner')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()

		table
			.integer('working_in')
			.unsigned()
			.references('establishment_id')
			.inTable(tableNames.establishments)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.vehicle_table, function (table) {
		table.increments('vehicle_id').notNullable()
		table.string('plate_number')
		table.string('color')
		table.string('vehicle_type')
		table.string('body_number')
		table
			.integer('vehicle_owner')
			.unsigned()
			.references('driver_id')
			.inTable(tableNames.driver_profile)
			.onDelete('CASCADE')
			.index()
	})
}

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists(tableNames.vehicle_table)
	await knex.schema.dropTableIfExists(tableNames.employee_profile)
	await knex.schema.dropTableIfExists(tableNames.establishments)
	await knex.schema.dropTableIfExists(tableNames.driver_profile)
	await knex.schema.dropTableIfExists(tableNames.user_profile)
	await knex.schema.dropTableIfExists(tableNames.admin_profile)
}
