import { cache, dbx, Gallery, GalleryFile } from '.'

export default async (_, { path }): Promise<Gallery[] | Gallery> => {
  try {
    const pieces = path
      .toLowerCase()
      .replace('/apps/chelly blog/', '')
      .split('/')

    const key = `/Apps/Chelly Blog/${pieces[0]}`
    const isSingle = pieces.length > 1

    if (!cache.has(key)) {
      const r = []

      for (const e of await getList(key)) {
        const isMatch = e.path_lower.endsWith(path.toLowerCase())

        if (isSingle && !isMatch) {
          continue
        }

        r.push({
          id: e.id,
          name: e.name,
          path: e.path_lower,
          files: []
        })

        if (isSingle && isMatch) {
          break
        }
      }

      cache.set(key, r)
    }

    const res = cache.get(key) as Gallery[]

    if (isSingle) {
      return res[0]
    }

    return res
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getList = async <T extends DropboxTypes.files.FileMetadataReference>(path: string): Promise<T[]> => {
  try {
    const { entries } = await dbx.filesListFolder({
      path
    })

    return entries as T[]
  } catch (err) {
    console.error(err)
    return []
  }
}

export const galleryFiles = async (path: string): Promise<GalleryFile[]> => {
  const key = `f-${path}`

  try {
    if (!cache.has(key)) {
      const r = []

      for (const f of await getList(path)) {
        r.push({
          id: f.id,
          name: f.name,
          path: f.path_lower,
          size: f.size,
          url: ''
        })
      }

      cache.set(key, r)
    }

    return cache.get(key) as GalleryFile[]
  } catch (err) {
    console.error(err)
    return []
  }
}
