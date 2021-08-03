const { model, Schema } = require('mongoose')

const BallotSchema = new Schema({
  candidate_name: String,
  candidate_party: String,
  votes: String,
  Constituency: String,
  PollingStation: String,
  type: String,
})

const ElectionSchema = new Schema({
  start_date: String,
  end_date: String,
  timezone: String,
  ballots: [BallotSchema],
})

module.exports = model('Election', ElectionSchema)
