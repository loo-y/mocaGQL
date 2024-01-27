const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`
const resolvers = {
    Query: {
      hello: () => 'Hello!'
    }
}

export default {
    typeDefinitions,
    resolvers,
}