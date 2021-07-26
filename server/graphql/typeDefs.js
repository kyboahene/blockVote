const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    getVoters: [Voter]
    getVoter(name: String!): Voter!
  }

  type Mutation {
    AdminLogin(email: String!, password: String!): Voter!
    VoterLogin(voterID: String!, voterKey: String!): Voter!
  }

  type Voter {
    id: ID!
    name: String!
    email: String!
    PollingStation: String!
    Constituency: String!
    token: String!
  }
`
