const { model, Schema } = require('mongoose')

const PollingStSchema = new Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  Region: {
    type: String,
  },
  District: {
    type: String,
  },
  Constituency: {
    type: String,
  },
  Registered_Voters: {
    type: String,
  },
})

module.exports = model('PollingStation', PollingStSchema)
