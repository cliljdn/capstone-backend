require("dotenv").config();
const jwt = require('jsonwebtoken')

module.exports = {
	sign: (payload) => {
		return new Promise((resolve, reject) => {
			return jwt.sign(
				{
					id: payload.id,
				},
				process.env.TOKEN_SECRET,
				{
					expiresIn: '1d',
				},
				function (err, token) {
					return err ? reject(err) : resolve(token)
				}
			)
		})
	},
	verify: (token) => {
		return new Promise((resolve, reject) => {
			return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
				return err ? reject(err) : resolve(decoded)
			})
		})
	},
}
