import faker from 'faker'
import styled from 'styled-components'

import Caption from './caption'

interface TOutter {
  key?: any
  img: string
  onMouse: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export default ({ onMouse, ...props }: TOutter) => (
  <Card {...props}>
    <div className="card-bg" onMouseDown={onMouse} onMouseEnter={onMouse} onMouseLeave={onMouse}>
      <img alt="" src={props.img} />
    </div>

    <Caption name={faker.name.findName()} />
  </Card>
)

const Card = styled.figure`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  vertical-align: top;

  div {
    display: inline-block;
    overflow: hidden;
    transform: scale(1);
    transition: ${({ theme }) => theme.timings.base};
    background: url(${({ img }: any) => img}) center / 150% auto no-repeat;

    &.out {
      z-index: -1;
      opacity: 0.5;
    }

    &:after {
      content: '';
      opacity: 0.5;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      mix-blend-mode: screen;
      transition: ${({ theme }) => theme.timings.fast};
      background: ${({ theme }) => theme.colours.brand};
    }

    &:not(.out):after {
      opacity: 0;
    }

    &:hover,
    &.open {
      @media (min-width: 768px) {
        transform: scale(1.5);
        transition-property: transform;
        transition-duration: 0.15s;
        background-position: calc(50% + var(--captionX, 1px)) center;
      }
    }
  }

  &:nth-child(3n + 1) div {
    transform-origin: left center;
  }

  &:nth-child(3n + 2) div {
    transform-origin: center;
  }

  &:nth-child(3n) div {
    transform-origin: right center;
  }

  &:nth-child(1) div {
    transform-origin: left top;
  }

  &:nth-child(2) div {
    transform-origin: center top;
  }

  &:nth-child(3) div {
    transform-origin: right top;
  }

  &:nth-last-child(1) div {
    transform-origin: right bottom;
  }

  &:nth-last-child(2) div {
    transform-origin: center bottom;
  }

  &:nth-last-child(3) div {
    transform-origin: left bottom;
  }

  img {
    visibility: hidden;
    width: 100%;
    height: auto;
    vertical-align: baseline;
    transform: translate3d(0, 0, 0);
  }
` as any
