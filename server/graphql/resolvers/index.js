const VoterResolvers = require('./voter')
const AdminReslovers = require('./admin')

module.exports = {
  Mutation: {
    ...VoterResolvers.Mutation,
    ...AdminReslovers.Mutation,
  },

  Query: {
    ...VoterResolvers.Query,
    ...AdminReslovers.Query,
  },
}
