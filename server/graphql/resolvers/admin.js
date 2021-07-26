const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server-errors')

const { SECRET_KEY } = require('../../config')
const { validLoginInput } = require('../../util/validate')
const { ObjectId } = require('bson')
const Voters = require('../../models/Voters')

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      name: admin.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' },
  )
}

module.exports = {
  Query: {
    async getVoters() {
      try {
        const voters = await Voters.find().sort({ age })
        return voters
      } catch (error) {
        throw new Error(error)
      }
    },
  },

  Mutation: {
    //login admin
    async AdminLogin(_, { email, password }) {
      const { errors, valid } = validLoginInput(email, password)
      if (!valid) throw new UserInputError('Wrong Credentials', { errors })

      const admin = await Voters.findOne({ email })
      if (!admin) error.general = 'Admin not found'
      throw new UserInputError('Wrong Credentials', { errors })

      const token = generateToken(admin)
      return {
        ...admin._doc,
        id: user._id,
        token,
      }
    },
  },
}
