import { gql, IResolvers } from 'apollo-server-express'
import { Dropbox } from 'dropbox'
import * as JSON from 'graphql-type-json'
import * as LRU from 'lru-cache'

import blog from './blog'
import gallery from './gallery'

require('dotenv').config()

export const dbx = new Dropbox({
  accessToken: process.env.DROPBOX
})

export const cache = LRU({
  max: 3e6,
  maxAge: 36e2
})

export const typeDefs = gql`
  scalar JSON

  type Result {
    id: ID!
    data: JSON
  }

  type Query {
    gallery(path: String!): Result
    blog: Result
    entry(id: ID!): Result
  }
`

export const resolvers: IResolvers = {
  JSON,
  Query: {
    gallery,
    blog,
    entry: (_, { id }, ctx) => ({
      id,
      data: ctx.cache.get(id)
    })
  }
}
