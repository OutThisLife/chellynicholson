import { gql, IResolvers } from 'apollo-server-express'
import * as JSON from 'graphql-type-json'

import { cache } from '.'

require('dotenv').config()

export const resolvers: IResolvers = {
  JSON,
  Query: {
    q: async (_, { q }, { dataSources: { Sanity } }) => Sanity.getData(q),

    posts: async (_, __, { dataSources: { Sanity } }): Promise<Post[]> =>
      (await Sanity.getData(`*[_type == 'post'] { ${postFrag} }`)).filter(
        p => p.slug !== 'about'
      ),

    post: async (_, args, { dataSources: { Sanity } }): Promise<Post[]> =>
      Sanity.getData(`*[slug.current == '${args.slug}'][0] { ${postFrag} }`),

    gallery: async (_, __, { dataSources: { Sanity } }) =>
      Sanity.getData(`*[_type == 'gallery'] { ${imgFrag} }`),

    piece: async (_, args, { dataSources: { Sanity } }) =>
      Sanity.getData(`*[slug.current == '${args.slug}'][0] { ${imgFrag} }`)
  }
}

export const typeDefs = gql`
  scalar JSON

  type Query {
    q(q: String!): JSON
    posts: [Post]
    gallery: [Gallery]

    post(slug: String!): Post
    piece(slug: String!): Gallery
  }

  type Post {
    id: ID!
    body: JSON
    createdAt: String
    img: Image
    slug: String
    title: String
  }

  type Gallery {
    id: ID!
    body: JSON
    category: Category
    featured: Boolean
    images: [Image]
    slug: String
    title: String
  }

  type Category {
    title: String
    slug: String
  }

  type Image {
    url: String
  }
`

export interface Post {
  id?: string
  title?: string
  slug?: string
  body?: any
  createdAt?: string
  featured?: boolean
  img?: {
    url: string
  }
  images?: Array<{ url: string }>
  category?: {
    title: string
    slug: string
  }
}

const isDev = process.env.NODE_ENV !== 'production'

export default {
  context: { cache },
  typeDefs,
  resolvers,
  introspection: isDev,
  playground: isDev,
  tracing: isDev,
  cacheControl: true,
  dataSources: () => ({ Sanity: require('./sanity') })
}

const postFrag = `
...,
'id': _id,
'slug': slug.current,
'createdAt': _createdAt,
'img': images.asset->{url}
`

const imgFrag = `
...,
'id': _id,
'slug': slug.current,
'createdAt': _createdAt,
'images': images[].asset->{url},
category->{title, slug},
`
