import { cache, dbx } from '.'

interface Entry extends DropboxTypes.files.FileMetadata {
  files?: DropboxTypes.files.GetTemporaryLinkResult[]
}

export const getFiles = async (path: string, key: string = path): Promise<Entry[]> => {
  try {
    if (!cache.has(key)) {
      const { entries } = await dbx.filesListFolder({
        path
      })

      cache.set(key, entries)
    }

    return cache.get(key) as Entry[]
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default async (_, { path }): Promise<Entry[]> => {
  try {
    const entries = await getFiles(`/Apps/Chelly Blog${path}`)

    if (!cache.has(path)) {
      const data = entries.reduce(async (acc, id, i) => {
        const cur = await acc
        cur[i].files = []

        try {
          const nestedEntries = await getFiles(id.path_lower, id.id)

          for (let n = 0, l = nestedEntries.length; n < l; n++) {
            try {
              const f = nestedEntries[n]

              if (!cache.has(f.id)) {
                cache.set(
                  f.id,
                  await dbx.filesGetTemporaryLink({
                    path: f.path_lower
                  })
                )
              }

              cur[i].files.push(cache.get(f.id) as DropboxTypes.files.GetTemporaryLinkResult)
            } catch (e) {
              console.error(e)
              throw e
            }
          }
        } catch (e) {
          console.error(e)
          throw e
        }

        return cur
      }, Promise.resolve(entries))

      cache.set(path, {
        id: path,
        data
      })
    }

    return cache.get(path) as Entry[]
  } catch (err) {
    console.error(err)
    throw err
  }
}
