import { size } from '@/theme'
import styled from 'styled-components'

import Nav from './nav'

interface TInner {
  onExit: React.MouseEventHandler<any>
  slides: Array<{
    src: string
    copy?: string
  }>
}

export default ({ onExit, slides = [], ...props }: TInner) => (
  <div {...props}>
    <Nav onExit={onExit} />

    {slides.map(({ src }) => (
      <Slide key={src} style={{ backgroundImage: `url(${src})` }}>
        <figcaption>
          <div>
            <h2>The Bobby Hill Fammy</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo vitae. Alias, rem illo? Explicabo
              doloremque voluptatem ab mollitia impedit molestias tempore velit ea rerum? Ratione doloribus nam quod
              eaque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo vitae. Alias, rem illo? Explicabo
              doloremque voluptatem ab mollitia impedit molestias tempore velit ea rerum? Ratione doloribus nam quod
              eaque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo vitae. Alias, rem illo? Explicabo
              doloremque voluptatem ab mollitia impedit molestias tempore velit ea rerum? Ratione doloribus nam quod
              eaque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo vitae. Alias, rem illo? Explicabo
              doloremque voluptatem ab mollitia impedit molestias tempore velit ea rerum? Ratione doloribus nam quod
              eaque?
            </p>
          </div>
        </figcaption>
      </Slide>
    ))}
  </div>
)

const Slide = styled.figure`
  display: inline-block;
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: fixed center top / cover no-repeat;

  figcaption {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 33vw;
    overflow: auto;
    padding: ${size(3)} 0 ${size(2)};
    transition: ${({ theme }) => theme.timings.base};
    background: ${({ theme }) => theme.colours.bg};

    @media (max-width: 768px) {
      top: ${size(5)};
      right: ${size(2)};
      left: ${size(2)};
      width: auto;
    }

    > div {
      height: 100%;
      padding: 0 ${size(2)};
      overflow: auto;
    }

    &:not(.open) {
      pointer-events: none;
      transform: translate3d(100%, 0, 0);

      @media (max-width: 768px) {
        opacity: 0;
        transform: none;
      }
    }

    h2 {
      font-size: 3rem;
      line-height: 1.5;
      text-transform: initial;
      margin: 4rem 0 2rem;
    }

    p {
      font-size: 1.3rem;
      text-transform: initial;
      letter-spacing: initial;
    }
  }
` as any
