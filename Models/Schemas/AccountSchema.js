const mongoose = require('mongoose')
const collectionNames = require('../../helpers/Constants/collectionNames')
const { Schema } = mongoose

let dataType = {
     type: String,
     require: true,
}

const schema = new Schema(
     {
          email: dataType,
          password: dataType,
          account_type: dataType,
          profile: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Profile,
          },
     },
     {
          timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
     }
)

module.exports = mongoose.model(collectionNames.Accounts, schema)
