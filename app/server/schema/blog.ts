import { cache, dbx } from '.'

export default async () => {
  const key = 'docs'

  try {
    if (!cache.has(key)) {
      const { doc_ids } = await dbx.paperDocsList({
        limit: 1000
      })

      const data = doc_ids.reduce(async (acc, id) => {
        const cur = await acc
        cur.push(await getSingle(id))
        return cur
      }, Promise.resolve([]))

      cache.set(key, data)
    }

    return cache.get(key)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getSingle = async (id: string): Post => {
  const { fileBinary, title }: any = await dbx.paperDocsDownload({
    doc_id: id,
    export_format: {
      '.tag': 'markdown'
    }
  })

  return {
    id,
    title,
    body: Buffer.from(fileBinary).toString()
  }
}
