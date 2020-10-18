require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
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

// constants for endpoints
const accountEnpoints = require('./lib/Endpoints/accounts/accounts.api')
const establishmentEndpoint = require('./lib/Endpoints/establishments/establishment.api')
const DriverProfileEndpoints = require('./lib/Endpoints/Drivers/Driver.api')

// mounts endpoints
app.use('/api/v1', accountEnpoints)
app.use('/api/v1', establishmentEndpoint)
app.use('/api/v1', DriverProfileEndpoints)

// constants for Model
const knexConfig = require('./knexfile')
const Knex = require('knex')
const { Model } = require('objection')

// Initialize knex.
const knex = Knex(knexConfig.development)

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const serverPort = process.env.PORT || 6060
app.listen(serverPort, '192.168.100.80', () => {
	console.log(`server is running on port http://localhost:${serverPort}`)
})
