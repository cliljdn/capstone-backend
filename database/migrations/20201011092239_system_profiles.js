<<<<<<< HEAD
const tableNames = require('../../lib/contants/TableNames')
const Knex = require('knex')
=======
const tableNames = require("../../lib/contants/TableNames");
const Knex = require("knex");
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.admin_profile, function (table) {
<<<<<<< HEAD
		table.increments('admin_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
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
		table.string('contactnumber')
		table.specificType('image', 'longblob')
		table
			.integer('profile_owner')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
		table.boolean('isDriver').defaultTo(false)
	})

	await knex.schema.createTable(tableNames.establishments, function (table) {
		table.increments('establishment_id').notNullable()
		table.string('name')
		table.string('street')
		table.string('telephone_number')
		table.string('establishment_owner')
		table.string('email')
		table.boolean('isActive')
	})

	await knex.schema.createTable(tableNames.employee_profile, function (table) {
		table.increments('employee_id').notNullable()
		table.string('firstname')
		table.string('lastname')
		table.string('middlename')
		table.string('age')
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
		table.boolean('isActive')
		table
			.integer('vehicle_owner')
			.unsigned()
			.references('user_id')
			.inTable(tableNames.user_profile)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.address_table, function (table) {
		table.increments('address_id').notNullable()
		table.string('house_lot_number')
		table.string('barangay')
		table.string('city')
		table
			.integer('address_owner')
			.unsigned()
			.references('account_id')
			.inTable(tableNames.accounts_table)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.admin_address, function (table) {
		table.increments('address_id').notNullable()
		table.string('house_lot_number')
		table.string('barangay')
		table.string('city')
		table
			.integer('address_owner')
			.unsigned()
			.references('admin_id')
			.inTable(tableNames.admin_profile)
			.onDelete('CASCADE')
			.index()
	})

	await knex.schema.createTable(tableNames.employee_address, function (table) {
		table.increments('address_id').notNullable()
		table.string('house_lot_number')
		table.string('barangay')
		table.string('city')
		table
			.integer('address_owner')
			.unsigned()
			.references('employee_id')
			.inTable(tableNames.employee_profile)
			.onDelete('CASCADE')
			.index()
	})
}
=======
		table.increments("admin_id").notNullable();
		table.string("firstname");
		table.string("lastname");
		table.string("middlename");
		table.date("birthday");
		table.string("contactnumber");
		table.specificType("image", "longblob");
		table
			.integer("profile_owner")
			.unsigned()
			.references("admin_id")
			.inTable(tableNames.admin_accounts)
			.onDelete("CASCADE")
			.index();
	});

	await knex.schema.createTable(tableNames.user_profile, function (table) {
		table.increments("user_id").notNullable();
		table.string("firstname");
		table.string("lastname");
		table.string("middlename");
		table.date("birthday");
		table.string("contactnumber");
		table.specificType("image", "longblob");
		table
			.integer("profile_owner")
			.unsigned()
			.references("account_id")
			.inTable(tableNames.accounts_table)
			.onDelete("CASCADE")
			.index();
		table.boolean("isDriver").defaultTo(false);
	});

	await knex.schema.createTable(tableNames.establishments, function (table) {
		table.increments("establishment_id").notNullable();
		table.string("name");
		table.string("street");
		table.string("telephone_number");
		table.string("establishment_owner");
		table.string("email");
		table.boolean("isActive");
	});

	await knex.schema.createTable(tableNames.employee_profile, function (table) {
		table.increments("employee_id").notNullable();
		table.string("firstname");
		table.string("lastname");
		table.string("middlename");
		table.date("birthday");
		table.string("contactnumber");
		table.string("position");
		table.specificType("image", "longblob");
		table
			.integer("profile_owner")
			.unsigned()
			.references("account_id")
			.inTable(tableNames.accounts_table)
			.onDelete("CASCADE")
			.index();

		table
			.integer("working_in")
			.unsigned()
			.references("establishment_id")
			.inTable(tableNames.establishments)
			.onDelete("CASCADE")
			.index();
	});

	await knex.schema.createTable(tableNames.vehicle_table, function (table) {
		table.increments("vehicle_id").notNullable();
		table.string("plate_number");
		table.string("color");
		table.string("vehicle_type");
		table.string("body_number");
		table.boolean("isActive");
		table
			.integer("vehicle_owner")
			.unsigned()
			.references("user_id")
			.inTable(tableNames.user_profile)
			.onDelete("CASCADE")
			.index();
	});

	await knex.schema.createTable(tableNames.address_table, function (table) {
		table.increments("address_id").notNullable();
		table.string("house_lot_number");
		table.string("barangay");
		table.string("city");
		table
			.integer("address_owner")
			.unsigned()
			.references("account_id")
			.inTable(tableNames.accounts_table)
			.onDelete("CASCADE")
			.index();
	});

	await knex.schema.createTable(tableNames.admin_address, function (table) {
		table.increments("address_id").notNullable();
		table.string("house_lot_number");
		table.string("barangay");
		table.string("city");
		table
			.integer("address_owner")
			.unsigned()
			.references("admin_id")
			.inTable(tableNames.admin_profile)
			.onDelete("CASCADE")
			.index();
	});

	await knex.schema.createTable(tableNames.employee_address, function (table) {
		table.increments("address_id").notNullable();
		table.string("house_lot_number");
		table.string("barangay");
		table.string("city");
		table
			.integer("address_owner")
			.unsigned()
			.references("employee_id")
			.inTable(tableNames.employee_profile)
			.onDelete("CASCADE")
			.index();
	});
};
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954

/**
 *
 * @param {Knex} knex
 */

exports.down = async function (knex) {
<<<<<<< HEAD
	await knex.schema.dropTableIfExists(tableNames.employee_address)
	await knex.schema.dropTableIfExists(tableNames.admin_address)
	await knex.schema.dropTableIfExists(tableNames.address_table)
	await knex.schema.dropTableIfExists(tableNames.vehicle_table)
	await knex.schema.dropTableIfExists(tableNames.employee_profile)
	await knex.schema.dropTableIfExists(tableNames.establishments)
	await knex.schema.dropTableIfExists(tableNames.user_profile)
	await knex.schema.dropTableIfExists(tableNames.admin_profile)
}
=======
	await knex.schema.dropTableIfExists(tableNames.employee_address);
	await knex.schema.dropTableIfExists(tableNames.admin_address);
	await knex.schema.dropTableIfExists(tableNames.address_table);
	await knex.schema.dropTableIfExists(tableNames.vehicle_table);
	await knex.schema.dropTableIfExists(tableNames.employee_profile);
	await knex.schema.dropTableIfExists(tableNames.establishments);
	await knex.schema.dropTableIfExists(tableNames.user_profile);
	await knex.schema.dropTableIfExists(tableNames.admin_profile);
};
>>>>>>> 2b2441db89ff466e072df13a6fd28379c4f85954
