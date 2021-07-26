const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server-errors')

const Voters = require('../../models/Voters')
const { validVoterInput } = require('../../util/validate')
const { ObjectId } = require('bson')

module.exports = {
  Query: {
    // async getVoters() {
    //   try {
    //     const voters = await Voters.find()
    //     return voters
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // },
  },

  Mutation: {
    //login voter
    async VoterLogin(_, { voterID, voterKey }) {
      const { errors, valid } = validVoterInput(voterID, voterKey)
      if (!valid) throw new UserInputError('Wrong Credentials', { errors })

      const voter = await Voters.findOne({ voterID })
      if (!voter) error.general = 'Voter not found'
      throw new UserInputError('Wrong Credentials', { errors })

      return {
        ...voter._doc,
        id: voter.id,
      }
    },
  },
}
