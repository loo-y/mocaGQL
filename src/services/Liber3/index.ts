import Liber3Dal from '../../dal/liber3'
import _ from 'lodash'

const typeDefinitions = /* GraphQL */ `
    scalar JSON
    type BookSummary {
        liber3(params: BookArgs!): [Book]
    }
`
const resolvers = {
    BookSummary: {
        liber3: async (ctx: TBaseContext, args: any) => {
            const bookArg = args?.params || {}
            const { count, keywords } = bookArg || {}
            if (!keywords) return []

            const result: any = await (await Liber3Dal.loader(ctx, { keywords, count })).load('all')
            if (Array.isArray(result?.result)) {
                return _.map(result.result, book => {
                    const { author, title, year, language, publisher, ipfs_cid, extension } = book?.row || {}
                    let downloadUrl = ``
                    if (ipfs_cid?.value) {
                        const fileName =
                            author?.value && title?.value
                                ? `${encodeURIComponent(author?.value)}_${encodeURIComponent(title?.value)}_liber3.${extension?.value || ''}`
                                : ``
                        downloadUrl = `https://cloudflare-ipfs.com/ipfs/${ipfs_cid.value}?filename=${fileName}`
                    }
                    return {
                        author: author?.value || ``,
                        title: title?.value || ``,
                        year: year?.value || ``,
                        language: language?.value || ``,
                        publisher: publisher?.value || ``,
                        downloadUrl: downloadUrl,
                    }
                })
            }
            return []
        },
    },
    // Book: {
    //     author: async (parent: any) => {
    //         const { author } = parent?.row || {}

    //         return author?.value || ``
    //     },
    //     title: async (parent: any) => {
    //         const { title } = parent?.row || {}
    //         return title?.value || ``
    //     },
    //     year: async (parent: any) => {
    //         const { year } = parent?.row || {}
    //         return year?.value || ``
    //     },
    //     language: async (parent: any) => {
    //         const { language } = parent?.row || {}
    //         return language?.value || ``
    //     },
    //     publisher: async (parent: any) => {
    //         const { publisher } = parent?.row || {}
    //         return publisher?.value || ``
    //     },
    //     downloadUrl: async (parent: any) => {
    //         let url = ``
    //         const { ipfs_cid, author, title, extension } = parent?.row || {}
    //         if (ipfs_cid?.value) {
    //             const fileName =
    //                 author?.value && title?.value
    //                     ? `${encodeURIComponent(author?.value)}_${encodeURIComponent(title?.value)}_liber3.${extension?.value || ''}`
    //                     : ``
    //             url = `https://cloudflare-ipfs.com/ipfs/${ipfs_cid.value}?filename=${fileName}`
    //         }
    //         return url
    //     },
    // },
}

export default {
    typeDefinitions,
    resolvers,
}
