import { Grid, size } from '@/theme'
import { timingFunctions } from 'polished'
import { withHandlers } from 'recompose'
import styled from 'styled-components'

interface THandlers {
  onMouse: React.MouseEventHandler<any>
}

export default withHandlers<{}, THandlers>(() => ({
  onMouse: () => ({ clientX, clientY, currentTarget }) => {
    const { innerWidth, innerHeight } = window
    const dist = clientX - innerWidth + (clientY - innerHeight)

    currentTarget.style.setProperty('--mouseP', `${dist}px`)
    currentTarget.style.setProperty('--mouseD', `${dist}deg`)
  }
}))(({ onMouse }) => (
  <Grid center={true} onMouseMove={onMouse}>
    <About>
      <div className="bg" />

      <h1>
        <span>
          About Me
        </span>
      </h1>

      <h2>
        <span>birth photographer, mom advocate, beautiful baebee</span>
      </h2>

      <div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto totam harum facilis laborum hic dolorem quos
          est aut, illo aspernatur omnis, repudiandae architecto praesentium neque adipisci, molestiae necessitatibus
          non fugit!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto totam harum facilis laborum hic dolorem quos
          est aut, illo aspernatur omnis, repudiandae architecto praesentium neque adipisci, molestiae necessitatibus
          non fugit!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto totam harum facilis laborum hic dolorem quos
          est aut, illo aspernatur omnis, repudiandae architecto praesentium neque adipisci, molestiae necessitatibus
          non fugit!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto totam harum facilis laborum hic dolorem quos
          est aut, illo aspernatur omnis, repudiandae architecto praesentium neque adipisci, molestiae necessitatibus
          non fugit!
        </p>
      </div>
    </About>
  </Grid>
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
    background: #efaec4 url(//scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/17862504_1286793721441445_7288108073519538977_n.jpg?_nc_cat=102&oh=f51a6e939596f3edd4ced94b64885815&oe=5C26CF06) center / cover no-repeat;

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
      transition: .3s ${timingFunctions('easeInOutSine')};
      background: #efaec4;
    }
  }

  h1 {
    grid-area: 1 / 1 / auto / -1;
    color: ${({ theme }) => theme.colours.bg};
    font-size: 9rem;
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
    grid-area: 2 / 11 / auto / -10;
    position: relative;
    margin: ${size(2)} 0 0;
    background: ${({ theme }) => theme.colours.bg};
  }
`
