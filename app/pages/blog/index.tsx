import { Post } from '@/server/schema'
import { Grid, size } from '@/theme'
import gql from 'graphql-tag'
import Link from 'next/link'
import { graphql } from 'react-apollo'
import styled from 'styled-components'

export default graphql<{}, { posts: Post[] }>(gql`
  query GetBlog {
    blog {
      id
      body
    }
  }
`)(({ data: { loading, posts = [] } }) => (
  <Grid center={true}>
    {!loading && (
      <Blog>
        {posts.map(({ id, title, body }) => (
          <article key={`post-${id}`}>
            <figure style={{ backgroundImage: `url(//picsum.photos/700/${700 * i}/?random)` }}>
              <img src={`//picsum.photos/200/200/?random`} />
            </figure>

            <aside>
              <Link href="/blog/test-post">
                <a>
                  <h2 dangerouslySetInnerHTML={{ __html: title }} />
                </a>
              </Link>

              <p>
                {body.substr(0, 36)}
                &hellip;
              </p>
            </aside>
          </article>
        ))}
      </Blog>
    )}
  </Grid>
))

export const Blog = styled.div`
  position: relative;
  grid-column: 3 / -3;

  article {
    + article {
      margin-top: ${size(2)};
    }

    figure {
      position: fixed;
      top: 10vh;
      right: 0;
      bottom: 10vh;
      left: 40vw;
      margin: 0;
      background: ${({ theme }) => theme.colours.ltBrand} url(//picsum.photos/1920/1080/?random) center / cover
        no-repeat;
      background-blend-mode: screen;

      @media (max-width: 768px) {
        bottom: 0;
      }

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40%;
      }

      &:before {
        left: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
      }

      &:after {
        right: 0;
        background: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent);
      }

      img {
        visibility: hidden;
      }
    }

    &:not(:hover) figure {
      visibility: hidden;
    }

    aside {
      z-index: 1;
      position: relative;
      width: 40vw;

      @media (max-width: 768px) {
        width: 80vw;
      }

      h2 {
        margin: 0;
      }

      p {
        margin: 0;

        + p {
          margin-top: 1em;
        }
      }

      img {
        width: 100%;
        margin: 1em auto;
      }
    }
  }
`
