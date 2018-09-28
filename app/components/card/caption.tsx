import { size } from '@/theme'
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
  transform: translate3d(calc(var(--captionX, 0) * -1), calc(var(--captionY, 0) * -1), 0);

  .card-bg:not(:hover) ~ & {
    visibility: hidden;

    h1 {
      opacity: 0;
      transform: scale(0.97);
    }
  }

  h1 {
    display: block;
    position: relative;
    width: 100%;
    color: ${({ theme }) => theme.colours.base};
    font-size: 15vmax;
    font-weight: 500;
    text-transform: none;
    margin: 0;
    transition: ${({ theme }) => theme.timings.base};

    @media (max-width: 768px) {
      font-size: 8vmax;
    }
  }
`
