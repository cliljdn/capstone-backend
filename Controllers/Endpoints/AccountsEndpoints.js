const express = require('express')
const AccountModel = require('../Classes/Account')
const router = express.Router()
const bcrypt = require('bcrypt')
router.get('/register/account', async (req, res, next) => {
     try {
          const data = await AccountModel.listAccounts()

          res.status(200).json(data)
     } catch (error) {
          next(error)
     }
})

module.exports = router
