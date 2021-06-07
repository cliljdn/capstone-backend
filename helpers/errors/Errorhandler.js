const ErrorHandler = (error, req, res, next) => {
     const statusCode = res.statusCode === 200 ? 500 : res.statusCode
     res.status(statusCode)

     res.json({
          error: {
               status: statusCode || 500,
               message: error.message || 'Internal Server Error',

               stack: process.env.NODE_ENV ? 'HEHE' : error.stack,
          },
     })
}

const notFound = (req, res, next) => {
     res.status(404).json({
          status: 404,
          error: `${req.protocol}://${req.get('host')}${
               req.originalUrl
          } -> not found`,
     })
}

module.exports = { ErrorHandler, notFound }
