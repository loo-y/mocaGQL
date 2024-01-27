import DataLoader from 'dataloader'
import { Liber3Args } from './type'

const fetchLiber3 = async (ctx: any, params: Record<string, any>, options: Record<string, any> = {}) => {
    let url = `https://gateway.glitternode.ru/blockved/glitterchain/index/sql/simple_query`

    console.log(`fetchLiber3🐹🐹🐹`)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
        body: JSON.stringify({ ...params }),
    })
    const json = await response.json()

    return json
}

const loaderLiber3 = async (ctx: any, args: Liber3Args) => {
    let loader = new DataLoader<string, string>(async keys => {
        console.log(`loaderLiber3-${keys}-🐹🐹🐹`)
        try {
            const { keywords } = args || {}
            const params = {
                sql: `select /*+ SET_VAR(full_text_option='{\"highlight\":{ \"style\":\"html\",\"fields\":[\"title\",\"author\"]}}') */ ipfs_cid,title,author,extension,language,publisher,year,filesize, _score,_id from library.ebook where query_string('title:\\\"${keywords}\\\"^1 author:\\\"${keywords}\\\"^0.5 title:${keywords}^0.1 author:${keywords}^0.1') limit 0, 50`,
                arguments: [],
            }
            const liber3Json = await fetchLiber3(ctx, params)
            return new Array(keys.length || 1).fill(liber3Json)
        } catch (e) {
            console.log(`[loaderLiber3] error: ${e}`)
        }
        return new Array(keys.length || 1).fill({ status: false })
    })

    return loader
}

export default { fetch: fetchLiber3, loader: loaderLiber3 }
