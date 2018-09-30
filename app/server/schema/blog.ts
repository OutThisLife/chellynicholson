import { cache, dbx } from '.'

export default async () => {
  try {
    const key = 'docs'

    if (!cache.has(key)) {
      const { doc_ids } = await dbx.paperDocsList({
        limit: 1000
      })

      const data = doc_ids.reduce(async (acc, id) => {
        const cur = await acc

        try {
          if (!cache.has(id)) {
            cache.set(
              id,
              await dbx.paperDocsDownload({
                doc_id: id,
                export_format: {
                  '.tag': 'html'
                }
              })
            )
          }

          cur.push(cache.get(id))
        } catch (e) {
          console.error(e)
          throw e
        }

        return cur
      }, Promise.resolve([]))

      cache.set(key, {
        id: key,
        data
      })
    }

    return cache.get(key)
  } catch (err) {
    console.error(err)
    throw err
  }
}
