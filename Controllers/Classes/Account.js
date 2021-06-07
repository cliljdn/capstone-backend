const AccountModel = require('../../Models/Schemas/AccountSchema')

module.exports = class Account {
     constructor(obj) {
          Object.keys(obj).map((k) => (this[k] = obj[k]))
     }

     //getters
     get getObjConstructor() {
          return {
               ...this,
          }
     }

     //setters

     //static methods
     static listAccounts() {
          return AccountModel.find({})
     }

     static insertAccount(obj) {
          AccountModel.create(obj)
     }
}
