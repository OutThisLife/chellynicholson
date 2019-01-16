import Meta from '@/components/meta'
import { Post } from '@/server/schema'
import { Grid, size } from '@/theme'
import BlockContent from '@sanity/block-content-to-react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { DataProps, graphql } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'
import styled from 'styled-components'

import { Blog } from '.'

export default compose<DataProps<{ post: Post }>, {}>(
  setDisplayName('single'),
  withRouter,
  graphql<WithRouterProps, { slug: string }>(
    gql`
      query Post($slug: String!) {
        post(slug: $slug) {
          id
          body
          title
          img {
            url
          }
        }
      }
    `,
    {
      options: ({
        router: {
          query: { slug }
        }
      }) => ({ variables: { slug } })
    }
  )
)(({ data: { post = {} } }) => (
  <Grid center={true}>
    {!('title' in post) ? null : (
      <Single>
        <Meta title={`${post.title} - Blog`} />

        <article>
          {'img' in post && (
            <figure style={{ backgroundImage: `url(${post.img.url})` }}>
              <img src={`${post.img.url}`} alt={post.title} />
            </figure>
          )}

          <aside>
            <Link href="/blog">
              <a style={{ opacity: 0.5 }}>&laquo; Back</a>
            </Link>

            <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
            <time title={post.createdAt}>{post.createdAt}</time>

            <div>
              <BlockContent blocks={post.body} />
            </div>
          </aside>
        </article>
      </Single>
    )}
  </Grid>
))

const Single = styled(Blog)`
  article {
    figure {
      position: relative;
      top: auto;
      bottom: auto;
      left: auto;
      height: 30vh;
      visibility: visible !important;

      img {
        display: none;
      }
    }

    aside {
      margin: ${size(2)} auto;
    }
  }
`
