import Meta from '@/components/meta'
import { Post } from '@/server/schema'
import { Grid, size } from '@/theme'
import gql from 'graphql-tag'
import Link from 'next/link'
import { DataProps, graphql } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'
import styled from 'styled-components'

export default compose<DataProps<{ posts: Post[] }>, {}>(
  setDisplayName('blog'),
  graphql<{}, { posts: Post[] }>(gql`
    query GetBlog {
      posts {
        id
        body
        slug
        title
        img {
          url
        }
      }
    }
  `)
)(({ data: { loading, posts = [] } }) => (
  <>
    <Meta title="Blog" />

    <Grid center={true}>
      {!loading && (
        <Blog>
          {posts.map(({ id, title, slug, img, body }) => (
            <article key={`post-${id}`}>
              {img && (
                <figure style={{ backgroundImage: `url(${img.url})` }}>
                  <img src={img.url} alt={title} />
                </figure>
              )}

              <aside>
                <Link href={`/blog/${slug}`}>
                  <a>
                    <h2 dangerouslySetInnerHTML={{ __html: title }} />
                  </a>
                </Link>

                {body && body.length && body[0].children[0].text.substr(0, 30)}
              </aside>
            </article>
          ))}
        </Blog>
      )}
    </Grid>
  </>
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
      background: ${({ theme }) => theme.colours.ltBrand}
        url(//picsum.photos/1920/1080/?random) center / cover no-repeat;
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
