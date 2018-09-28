import { Grid, size } from '@/theme'
import faker from 'faker'
import Link from 'next/link'
import styled from 'styled-components'

export default () => (
  <Grid center={true}>
    <Blog>
      {[...Array(10).keys()].map(i => (
        <article key={Math.random()}>
          <figure style={{ backgroundImage: `url(//picsum.photos/700/${700 * i}/?random)` }}>
              <img src={`//picsum.photos/200/200/?random`} />
          </figure>

          <aside>
            <Link href="/blog/test-post">
              <a>
                <h2>
                  {faker.lorem.sentence()}
                </h2>
              </a>
            </Link>

            <p>{faker.lorem.words()}</p>
          </aside>
        </article>
      ))}
    </Blog>
  </Grid>
)

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
      background: url(//picsum.photos/1920/1080/?random) center / cover no-repeat;

      &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40%;
      }

      &:before {
        left: 0;
        background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);
      }

      &:after {
        right: 0;
        background: linear-gradient(to left, rgba(0,0,0,0.2), transparent);
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

      h2 {
        font-size: 2.5rem;
        margin: 0 0 0.5em;
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
