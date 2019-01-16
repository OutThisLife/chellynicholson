import { Post } from '@/server/schema'
import { timingFunctions } from 'polished'
import { compose, setDisplayName } from 'recompose'
import styled from 'styled-components'

interface TOutter extends Post {
  key?: any
}

interface TInner extends TOutter {
  onMouse: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export default compose<TInner, TOutter>(setDisplayName('gallery-card'))(
  ({ onMouse, id, title, images = [], ...props }) => (
    <Card {...props}>
      {images.length ? (
        <div
          className="card-bg"
          data-ref={id}
          onMouseDown={onMouse}
          onMouseEnter={onMouse}
          onMouseLeave={onMouse}
          style={{
            backgroundImage: `url(${images[0].url})`
          }}>
          <img src={images[0].url} alt={title} />
        </div>
      ) : null}

      <Caption>
        <h1
          dangerouslySetInnerHTML={{ __html: title.replace(/\s+/g, '<br />') }}
        />
      </Caption>
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

const Caption = styled.figcaption`
  z-index: 10;
  user-select: none;
  pointer-events: none;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  h1 {
    color: ${({ theme }) => theme.colours.base};
    font-size: 10vmax;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
    transform: translate3d(
      calc(0% + var(--captionX, 0px)),
      calc(0% + var(--mouseY, 0)),
      0
    );

    @media (max-width: 768px) {
      font-size: 8vmax;
    }
  }

  .card-bg:not(:hover) ~ & {
    visibility: hidden;
  }
`
