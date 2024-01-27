import Liber3Dal from '../../dal/liber3'

const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type Query {
        liber3: Book
    }

    type Book {
        author: String!
        title: String!
    }
`
const resolvers = {
    Query: {
        liber3: async (ctx: any) => {
            return {
                loader: await Liber3Dal.loader(ctx, { keywords: '三重门' }),
            }
        },
    },
    Book: {
        author: async (parent: any) => {
            const { loader } = parent || {}
            const result = await loader.load('author')
            console.log(`author result`, result)
            return `author`
        },
        title: async (parent: any) => {
            const { loader } = parent || {}
            const result = await loader.load('title')
            console.log(`title result`, result)
            return `title`
        },
    },
}

export default {
    typeDefinitions,
    resolvers,
}
