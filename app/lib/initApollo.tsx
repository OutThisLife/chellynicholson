import 'isomorphic-unfetch'

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

let apolloClient = null
const isDev = process.env.NODE_ENV !== 'production'
const isBrowser = 'browser' in process

// --------------------------------

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message, locations, path }) =>
        isDev &&
        console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
    )
  }

  if (networkError && isDev) {
    console.error('[Network error]', networkError)
  }
})

const createStore = (initialState): ApolloClient<{}> =>
  new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      new HttpLink({
        uri: `http://localhost:3000/graphql`
      })
    ]),
    ssrMode: !isBrowser,
    connectToDevTools: isDev && isBrowser,
    cache: new InMemoryCache({
      dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null)
    }).restore(initialState)
  })

// --------------------------------

export default (initialState = {}): ApolloClient<{}> => {
  if (!isBrowser) {
    return createStore(initialState)
  }

  if (!apolloClient) {
    apolloClient = createStore((window as any).__NEXT_DATA__.props.apolloState || {})
  }

  return apolloClient
}
