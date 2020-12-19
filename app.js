require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
	cors({
		'Access-Control-Allow-Origin': '*',
	})
)
app.use(helmet())
app.use(morgan('tiny'))
app.use(
	compression({
		level: 6,
		threshold: 100 * 1000,
		filter: (req, res) => {
			if (req.headers['x-no-compression']) {
				return false
			}

			return compression.filter(req, res)
		},
	})
)
//middlewares
const middlewares = require('./middlewares/middlewares')

app.get('/', (req, res) => {
	res.json({
		message: 'ScanGapo',
	})
})

// constants for endpoints Mobile
const accountEnpoints = require('./lib/Endpoints/Mobile/accounts.api')
const establishmentEndpoint = require('./lib/Endpoints/establishments/establishment.api')
const DriverProfileEndpoints = require('./lib/Endpoints/Drivers/Driver.api')
const AddressEndpoints = require('./lib/Endpoints/Address/Address.api')
const listAccountEndpoints = require('./lib/Endpoints/Mobile/ListAccounts.api')

// constants for endpoints Admin
const adminEndpoints = require('./lib/Endpoints/Admin/Admin.api')
const ListDrivers = require('./lib/Endpoints/Admin/List.api')

// mounts endpoints
app.use('/api/v1', accountEnpoints)
app.use('/api/v1', establishmentEndpoint)
app.use('/api/v1', DriverProfileEndpoints)
app.use('/api/v1', AddressEndpoints)
app.use('/api/v1', listAccountEndpoints)
app.use('/api/v1', adminEndpoints)
app.use('/api/v1', ListDrivers)

// constants for Model
const knexConfig = require('./knexfile')
const Knex = require('knex')
const { Model } = require('objection')

// Initialize knex.
const knex = Knex(knexConfig.client)

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const serverPort = process.env.PORT || 6060
app.listen(serverPort, '0.0.0.0', () => {
	console.log(`server is running on port http://localhost:${serverPort}`)
})
