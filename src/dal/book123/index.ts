import DataLoader from 'dataloader'
import { Book123Args } from './type'

const fetchBook123 = async (ctx: TBaseContext, params: Record<string, any>, options: Record<string, any> = {}) => {
    let url = `https://www.book123.info/api/simple_search`
    const { keywords, count, page } = params || {}
    url = `${url}?count=${count || 4}&page=${page || 1}&key=${keywords}`
    console.log(`fetchBook123 🐹🐹🐹`, url)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    })
    const json = await response.json()

    return json
}

const loaderBook123 = async (ctx: TBaseContext, args: Book123Args & { key: string }) => {
    const { key: argKey, ...otherArgs } = args || {}
    ctx.loaderBook123Args = {
        ...ctx.loaderBook123Args,
        [argKey]: otherArgs,
    }
    if (!ctx?.loaderBook123) {
        const loader = new DataLoader<string, string>(async keys => {
            console.log(`loaderBook123 keys 🐹🐹🐹`, keys)
            console.log(`args`, args)
            try {
                const liber3Json = await Promise.all(
                    keys.map(key =>
                        fetchBook123(ctx, {
                            ...ctx.loaderBook123Args[key],
                        })
                    )
                )
                return liber3Json
                // return new Array(keys.length || 1).fill(liber3Json)
            } catch (e) {
                console.log(`[loaderLiber3] error: ${e}`)
            }
            return new Array(keys.length || 1).fill({ status: false })
        })
        ctx.loaderBook123 = loader
    }

    return ctx.loaderBook123
    // return loader
}

export default { fetch: fetchBook123, loader: loaderBook123 }
