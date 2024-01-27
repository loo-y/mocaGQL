const typeDefinitions = /* GraphQL */ `
    type Query {
        info: String!
        world: String!
        feed: Link!
    }
`
const resolvers = {
    Query: {
        world: () => 'World!',
        feed: () => {
            return {
                id: 111,
                description: `222`,
                url: `333`,
            }
        },
    },
}

export default {
    typeDefinitions,
    resolvers,
}
