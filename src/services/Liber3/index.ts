import Liber3Dal from '../../dal/liber3'
import _ from 'lodash'

const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type Query {
        liber3: [Book]
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
    }

    extend type Query {
        liber3(params: BookArgs!): [Book]
    }
`
const resolvers = {
    Query: {
        liber3: async (ctx: any, args: any) => {
            const bookArg = args?.params || {}
            const keywords = bookArg?.keywords || ``
            if (!keywords) return []

            const result: any = await (await Liber3Dal.loader(ctx, { keywords })).load('all')
            if (Array.isArray(result?.result)) {
                return result.result
            }
            return []
        },
    },
    Book: {
        author: async (parent: any) => {
            const { author } = parent?.row || {}

            return author?.value || ``
        },
        title: async (parent: any) => {
            const { title } = parent?.row || {}
            return title?.value || ``
        },
        year: async (parent: any) => {
            const { year } = parent?.row || {}
            return year?.value || ``
        },
        language: async (parent: any) => {
            const { language } = parent?.row || {}
            return language?.value || ``
        },
        publisher: async (parent: any) => {
            const { publisher } = parent?.row || {}
            return publisher?.value || ``
        },
        downloadUrl: async (parent: any) => {
            let url = ``
            const { ipfs_cid, author, title, extension } = parent?.row || {}
            if (ipfs_cid?.value) {
                const fileName =
                    author?.value && title?.value
                        ? `${encodeURIComponent(author?.value)}_${encodeURIComponent(title?.value)}_liber3.${extension?.value || ''}`
                        : ``
                url = `https://cloudflare-ipfs.com/ipfs/${ipfs_cid.value}?filename=${fileName}`
            }
            return url
        },
    },
}

export default {
    typeDefinitions,
    resolvers,
}
