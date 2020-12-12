const CustomError = require('./CustomError')
const notFound = (req, res, next) => {
	const error = new Error(`cannot find -> ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
		inner: error.inner || undefined,
	})
}

module.exports = { notFound, errorHandler }
