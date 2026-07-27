const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const User = require('./models/user')

const getUserFromAuthHeader = async (auth) => {
  console.log("AUTH HEADER:", auth)

  if (!auth || !auth.startsWith('Bearer ')) {
    console.log("NO AUTH")
    return null
  }

  const token = auth.substring(7)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  console.log("DECODED TOKEN:", decodedToken)

  const user = await User.findById(decodedToken.id)
  console.log("FOUND USER:", user)

  return user
}


const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization
      const currentUser = await getUserFromAuthHeader(auth)
      return { currentUser }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

module.exports = startServer