const { model, Schema } = require('mongoose')

const VoterSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  VoterID_Number: {
    type: String,
  },
  phone: {
    type: String,
  },
  district: {
    type: String,
  },
  constituency: {
    type: String,
  },
  PollingStation: {
    type: String,
  },
  Region: {
    type: String,
  },
  type: {
    type: String,
    default: 'User',
  },
})

module.exports = model('Voters', VoterSchema)
