import { size } from '@/theme'
import { rgba } from 'polished'
import styled from 'styled-components'

export default ({ name }: { name: string }) => (
  <Caption>
    <h1>{name}</h1>
  </Caption>
)

const Caption = styled.figcaption`
  z-index: 10;
  user-select: none;
  pointer-events: none;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: ${size(3)};
  bottom: 0;
  left: ${size(3)};
  text-align: center;
  will-change: transform;
  mix-blend-mode: multiply;
  transform: translate3d(calc(var(--captionX, 0) * -1), calc(var(--captionY, 0) * -1), 0);

  .card-bg:not(:hover) ~ & {
    visibility: hidden;

    h1 {
      opacity: 0;
      transform: scale(0.97);
    }
  }

  .card-bg.open ~ & h1 {
    opacity: 0;
  }

  h1 {
    display: block;
    position: relative;
    width: 100%;
    color: transparent;
    font-size: 15vmax;
    font-weight: 400;
    text-transform: none;
    -webkit-text-stroke: 1px ${({ theme }) => rgba(theme.colours.base, 1)};
    margin: 0;
    transition: ${({ theme }) => theme.timings.base};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
  }
`
