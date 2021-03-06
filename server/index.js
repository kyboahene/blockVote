const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { MONGODB, PORT } = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const cookieParser = require('cookie-parser')

mongoose.set('useFindAndModify', false)

const startServer = async () => {
  await mongoose
    .connect(MONGODB || 'mongodb://localhost:27017/votingapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Mongodb connected')
      app.listen(PORT, () => {
        console.log(`Server is connected${server.graphqlPath}`)
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

const app = express()

app.use(cookieParser())
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

startServer()
