const typeDefinitions = /* GraphQL */ `
  type Query {
    world: String!
  }
`
const resolvers = {
    Query: {
        world: () => 'World!'
    }
}

export default {
    typeDefinitions,
    resolvers,
}