import { gql, IResolvers } from 'apollo-server-express'
import { Dropbox } from 'dropbox'
import * as JSON from 'graphql-type-json'
import * as LRU from 'lru-cache'
import { dirname } from 'path'

import blog, { getSingle } from './blog'
import gallery, { galleryFiles } from './gallery'

require('dotenv').config()

export const dbx = new Dropbox({
  accessToken: process.env.DROPBOX
})

export const cache = LRU({
  max: 3e6,
  maxAge: 36e2
})

export const resolvers: IResolvers = {
  JSON,
  Query: {
    gallery,
    blog,
    slideshow: gallery,
    entry: async (_, { id }) => await getSingle(id)
  },

  Gallery: {
    files: async ({ path }) => await galleryFiles(dirname(path))
  },

  File: {
    url: async ({ path }, _, ctx) => {
      const key = `f-${dirname(path)}-url`

      if (!ctx.cache.has(key)) {
        try {
          const { link } = await dbx.filesGetTemporaryLink({ path: dirname(path) })
          ctx.cache.set(key, link)
        } catch (err) {
          ctx.cache.set(key, '')
        }
      }

      return ctx.cache.get(key)
    }
  }
}

export const typeDefs = gql`
  scalar JSON

  type Query {
    gallery(path: String!): [Gallery]
    slideshow(path: String!): Gallery
    blog: [Post]
    entry(id: ID!): Post
  }

  type File {
    id: ID!
    name: String!
    path: String
    size: Int
    url: String!
  }

  type Gallery {
    id: ID!
    name: String!
    path: String!
    files: [File]!
  }

  type Post {
    id: ID!
    title: String
    body: String!
  }
`

export interface Gallery {
  id: string
  name: string
  path: string
  files?: GalleryFile[]
}

export interface GalleryFile {
  id: string
  name: string
  path?: string
  size: string
  url: string
}

export interface Post {
  id: string
  title: string
  body: string
}
