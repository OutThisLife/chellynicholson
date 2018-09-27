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
    filter: sepia(0) hue-rotate(0deg) opacity(1);
    transform: scale(1) translate3d(0, 0, 0);
    transition: filter ${({ theme }) => theme.timings.base};
    transition-property: filter, transform;
    background: url(${({ img }: any) => img}) center / 150% auto no-repeat;

    &:hover {
      transform: scale(1.5);
      background-position: calc(50% + var(--captionX, 1px)) center;
    }

    &.out {
      z-index: -1;
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

  figcaption h1 {
    background-image: url(${({ img }: any) => img});
  }
` as any
