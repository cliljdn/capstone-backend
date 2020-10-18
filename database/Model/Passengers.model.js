const {Model} = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class Passengers extends Model {

    static get tableName() {
        return tableNames.passengers
    }
}