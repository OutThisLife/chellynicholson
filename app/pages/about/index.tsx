import Meta from '@/lib/Meta'
import { Post } from '@/server/schema'
import { Grid, size } from '@/theme'
import BlockContent from '@sanity/block-content-to-react'
import gql from 'graphql-tag'
import { timingFunctions } from 'polished'
import { DataProps, graphql } from 'react-apollo'
import { compose, setDisplayName, withHandlers } from 'recompose'
import styled from 'styled-components'

interface THandlers {
  onMouse: React.MouseEventHandler<any>
}

export default compose<THandlers & DataProps<{ post: Post }>, {}>(
  setDisplayName('about'),
  graphql(gql`
    {
      post(slug: "about") {
        title
        body
        img {
          url
        }
      }
    }
  `),
  withHandlers<{}, THandlers>(() => ({
    onMouse: () => ({ clientX, clientY, currentTarget }) => {
      const { innerWidth, innerHeight } = window
      const dist = clientX - innerWidth + (clientY - innerHeight)

      currentTarget.style.setProperty('--mouseP', `${dist}px`)
      currentTarget.style.setProperty('--mouseD', `${dist}deg`)
    }
  }))
)(({ onMouse, data: { post = {} } }) => (
  <>
    <Meta title="About Me" />

    {'title' in post && (
      <Grid center={true} onMouseMove={onMouse}>
        <About>
          {'img' in post && (
            <div
              className="bg"
              style={{
                backgroundImage: `url(${post.img.url})`
              }}
            />
          )}

          <h1>
            <span dangerouslySetInnerHTML={{ __html: post.title }} />
          </h1>

          <h2>
            <span>birth &amp; life photographer</span>
          </h2>

          <div>
            <BlockContent blocks={post.body} />
          </div>
        </About>
      </Grid>
    )}
  </>
))

const About = styled.div`
  grid-column: 3 / -3;
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-template-rows: auto 1fr;

  .bg {
    z-index: 1;
    cursor: url(/static/img/icon-heart.svg), auto;
    content: '';
    display: block;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 40vw;
    height: 70vh;
    background: ${({ theme }) => theme.colours.ltBrand}
      url(//scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/17862504_1286793721441445_7288108073519538977_n.jpg?_nc_cat=102&oh=f51a6e939596f3edd4ced94b64885815&oe=5C26CF06)
      center / cover no-repeat;

    &:not(:hover) {
      transform: scaleX(-1);

      &:after {
        opacity: 1;
      }
    }

    &:hover {
      z-index: 3;
    }

    &:after {
      opacity: 0;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      mix-blend-mode: screen;
      transition: 0.3s ${timingFunctions('easeInOutSine')};
      background: ${({ theme }) => theme.colours.ltBrand};
    }
  }

  h1 {
    grid-area: 1 / 1 / auto / -1;
    color: ${({ theme }) => theme.colours.bg};
    margin: 0;

    > span {
      display: inline-block;
      position: relative;
      padding: 0 60px 0 5px;
      background: ${({ theme }) => theme.colours.base};
    }
  }

  h2 {
    grid-area: 2 / 1 / auto / span 9;
    margin: 0.5em 0 0;

    > span {
      display: block;
    }
  }

  > div {
    z-index: 2;
    grid-area: 2 / 11 / auto / span 12;
    position: relative;
    margin: ${size(2)} 0 0;
    background: ${({ theme }) => theme.colours.bg};

    @media (max-width: 768px) {
      grid-row-start: 3;
      grid-column: 3 / -3;
    }
  }
`
