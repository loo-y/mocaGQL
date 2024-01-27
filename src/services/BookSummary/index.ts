const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type Query {
        bookSummary: BookSummary
    }

    type BookSummary {
        JSON: JSON
    }
    type Book {
        author: String!
        title: String!
        """
        下载地址
        """
        downloadUrl: String
        """
        年份
        """
        year: String
        """
        语言
        """
        language: String
        """
        出版商
        """
        publisher: String
    }

    input BookArgs {
        "关键词"
        keywords: String!
        "数量"
        count: Int
    }
`
const resolvers = {
    Query: {
        bookSummary: async (ctx: TBaseContext, args: any) => {
            const bookArg = args?.params || {}
            const { keywords, count } = bookArg || {}
            return {
                keywords,
                count,
            }
        },
    },
    // Book: {
    //     author: async (parent: any) => {
    //         const { author } = parent || {}

    //         return author || ``
    //     },
    //     title: async (parent: any) => {
    //         const { title } = parent || {}
    //         return title || ``
    //     },
    //     year: async (parent: any) => {
    //         const { pubDate } = parent || {}
    //         return pubDate?.match(/\d{4}/)?.[0] || ``
    //     },
    //     language: async (parent: any) => {
    //         return ``
    //     },
    //     publisher: async (parent: any) => {
    //         return ``
    //     },
    //     downloadUrl: async (parent: any) => {
    //         let url = ``
    //         const { downloadUrl } = parent || {}
    //         if (downloadUrl) {

    //             url = `https://static2.file123.info${downloadUrl}`
    //         }
    //         return url
    //     },
    // },
}

export default {
    typeDefinitions,
    resolvers,
}
