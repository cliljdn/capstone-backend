require('dotenv').config()
const express = require('express')
const app = express()
// const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(
	cors({
		'Access-Control-Allow-Origin': '*',
	})
)
app.use(helmet())
// app.use(morgan('tiny'))

// app.use(
// 	compression({
// 		level: 6,
// 		threshold: 100 * 1000,
// 		filter: (req, res) => {
// 			if (req.headers['x-no-compression']) {
// 				return false
// 			}

// 			return compression.filter(req, res)
// 		},
// 	})
// )

app.use(compression())

//middlewares
const middlewares = require('./middlewares/middlewares')

app.get('/', (req, res) => {
	res.json({
		message: 'ScanGapo',
	})
})

// constants for endpoints Mobile
const accountEnpoints = require('./lib/Endpoints/web/postreq/accounts.api')

const AddressEndpoints = require('./lib/Endpoints/web/Address/Address.api')
const listAccountEndpoints = require('./lib/Endpoints/web/list/ListAccounts.api')

const trasactionList = require('./lib/Endpoints/web/list/transactionList.api')

// mounts endpoints
app.use('/api/v1', accountEnpoints)
app.use('/api/v1', AddressEndpoints)
app.use('/api/v1', listAccountEndpoints)
app.use('/api/v1', trasactionList)

// constants for Model
const knexConfig = require('./knexfile')
const Knex = require('knex')
const { Model } = require('objection')

// Initialize knex.
const knex = Knex(knexConfig.production)

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
