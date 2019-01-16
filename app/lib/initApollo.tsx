import 'isomorphic-unfetch'

import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

let apolloClient = null

// --------------------------------

const createCache = (): InMemoryCache => {
  const cache = new InMemoryCache({
    dataIdFromObject: (o: any) => (o._id ? `${o.__typename}:${o._id}` : null)
  })

  if ('browser' in process) {
    ;(async () =>
      await persistCache({
        cache,
        maxSize: 1048576,
        storage: window.localStorage,
        debug: isDev
      }))()
  }

  return cache
}

const createStore = (initialState): ApolloClient<{}> => {
  const cache = createCache().restore(initialState)
  const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (!isDev) {
        return
      }

      if (graphQLErrors) {
        console.log(JSON.stringify(graphQLErrors, null, 1))
      }

      if (networkError) {
        console.error('[Network error]', networkError)
      }
    }),

    createPersistedQueryLink().concat(
      createHttpLink({
        uri: getConfig().publicRuntimeConfig.API_URL,
        credentials: 'same-origin'
      })
    )
  ])

  return new ApolloClient({
    link,
    cache,
    ssrMode: !('browser' in process),
    connectToDevTools: isDev && 'browser' in process
  })
}

// --------------------------------

export default (initialState = {}): ApolloClient<{}> => {
  if (!('browser' in process)) {
    return createStore(initialState)
  }

  if (!apolloClient) {
    apolloClient = createStore(
      (window as any).__NEXT_DATA__.props.apolloState || {}
    )
  }

  return apolloClient
}
