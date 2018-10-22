import { Gallery } from '@/server/schema'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { branch, compose, renderComponent } from 'recompose'

export const getGallery = <T = Gallery[]>(q = 'FeaturedPosts', name = 'gallery') =>
  compose<{ path: string; gallery: T }, { path: string }>(
    graphql<{ path: string }, { gallery: T }>(
      gql`
        query ${q}($path: String!) {
          ${name} (path: $path) {
            id
            name
            path
            files {
              id
              path
              url
            }
          }
        }
      `,
      {
        skip: props => !('path' in props),
        options: ({ path }) => ({
          variables: { path }
        })
      }
    ),
    branch(({ data = {} }: any) => data.loading || data.networkStatus !== 7, renderComponent(() => null))
  )

export const getSlides = () => getGallery<Gallery>('GetSlideshow', 'slideshow')
