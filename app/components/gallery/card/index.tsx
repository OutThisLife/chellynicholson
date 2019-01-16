import { Post } from '@/server/schema'
import { timingFunctions } from 'polished'
import { compose, setDisplayName } from 'recompose'
import styled from 'styled-components'

import Caption from './caption'

interface TOutter extends Post {
  key?: any
}

interface TInner extends TOutter {
  onMouse: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export default compose<TInner, TOutter>(setDisplayName('gallery-card'))(
  ({ onMouse, title, images = [], ...props }) => (
    <Card {...props}>
      {images.length ? (
        <div
          className="card-bg"
          onMouseDown={onMouse}
          onMouseEnter={onMouse}
          onMouseLeave={onMouse}
          style={{
            backgroundImage: `url(${images[0].url})`
          }}>
          <img src={images[0].url} alt={title} />
        </div>
      ) : null}

      <Caption title={title} />
    </Card>
  )
)

const Card = styled.figure`
  cursor: url(/static/img/icon-plus.svg), auto;
  display: flex;
  align-items: center;
  position: relative;
  vertical-align: top;
  margin: 0;

  div {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: scale(1);
    background: url(${({ img }: any) => img}) center / cover no-repeat;

    img {
      visibility: hidden;
      width: 100%;
      height: auto;
      vertical-align: top;
      transform: translate3d(0, 0, 0);
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &:before {
      z-index: 11;
      opacity: 0;
      top: -20%;
      right: -20%;
      bottom: -20%;
      left: -20%;
      background: inherit;
    }

    &:after {
      mix-blend-mode: screen;
      transition: 0.3s ${timingFunctions('easeInOutSine')};
      background: ${({ theme }) => theme.colours.ltBrand};
    }

    &:not(.out) {
      z-index: 1;

      &:after {
        opacity: 0;
      }
    }
  }
` as any
