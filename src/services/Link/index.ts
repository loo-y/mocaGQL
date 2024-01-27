const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type Link {
        id: ID!
        description: String!
        url: String!
        others: JSON
    }
`

const resolvers = {
    Link: {
        id: (parent: any) => parent?.id || 111,
        description: (parent: any) => parent?.description || `222`,
        url: (parent: any) => parent?.url || `333`,
        others: (parent: any) => parent?.others || { a: 1, b: 2 },
    },
}

export default {
    typeDefinitions,
    resolvers,
}
