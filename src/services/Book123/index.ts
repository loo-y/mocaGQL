import Book1233Dal from '../../dal/book123'
import _ from 'lodash'

const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type BookSummary {
        book123(params: BookArgs!): [Book]
    }
`
const resolvers = {
    BookSummary: {
        book123: async (ctx: TBaseContext, args: any) => {
            const bookArg = args?.params || {}
            const { keywords, count } = bookArg || {}
            if (!keywords) return []
            const key = keywords
            const loader = Book1233Dal.loader(ctx, { keywords, count, key })
            const result: any = await (await loader).load(key)
            if (Array.isArray(result?.books)) {
                return _.map(result.books, book => {
                    return {
                        author: book?.author || ``,
                        title: book?.title || ``,
                        year: book?.pubDate?.match(/\d{4}/)?.[0] || ``,
                        downloadUrl: book?.downloadUrl ? `https://static2.file123.info${book.downloadUrl}` : ``,
                    }
                })
            }
            return []
        },
    },
}

export default {
    typeDefinitions,
    resolvers,
}
