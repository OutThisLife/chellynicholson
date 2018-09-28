import { Grid, size } from '@/theme'
import faker from 'faker'
import Link from 'next/link'
import styled from 'styled-components'

import { Blog } from '.'

export default () => (
  <Grid center={true}>
    <Single>
      <article key={Math.random()}>
        <figure style={{ backgroundImage: `url(//picsum.photos/700/700/?random)` }}>
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

          <div>
            <p>{faker.lorem.paragraph()}</p>
            <p>{faker.lorem.paragraph()}</p>
            <p>{faker.lorem.paragraph()}</p>
            <p>{faker.lorem.paragraph()}</p>
            <p>{faker.lorem.paragraph()}</p>
            <p>{faker.lorem.paragraph()}</p>
            <img src={`//picsum.photos/900/900/?random`} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut inventore quo libero temporibus? Ullam mollitia suscipit dolorum. At, labore. Laboriosam nihil corporis accusantium, illo ratione eius eum fugiat maxime deserunt!
            </p>
            <p>{faker.lorem.paragraph()}</p>
          </div>
        </aside>
      </article>
    </Single>
  </Grid>
)

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
