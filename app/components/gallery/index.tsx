import { size } from '@/theme'
import styled, { css } from 'styled-components'

export { default as Card } from './card'

interface TInner {
  children?: React.ReactNode
  variant?: 'normal' | 'fancy'
}

export default ({ children, ...props }: TInner) => <Gallery {...props}>{children}</Gallery>

const Gallery = styled.section`
  grid-column: 3 / -3;
  display: grid;
  grid-gap: ${size(1)};
  position: relative;
  width: 100%;

  figure img {
    display: none;
  }

  @media (min-width: 768px) {
    figure div:hover,
    figure div.open {
      transform: scale(1.05);
      transition-property: transform;
      transition-duration: 0.15s;

      &:before {
        opacity: 1;
        background-position: ${({ variant = 'normal' }: TInner) =>
          variant === 'normal'
            ? css`calc(50% + (var(--mouseX, 1px) / 12)) center`
            : css`center calc(50% + (var(--mouseY, 1px) / 12));`};
      }
    }

    ${({ variant = 'normal' }: TInner) =>
      variant === 'normal'
        ? css`
            grid-template-columns: repeat(3, 1fr);

            figure {
              img {
                display: none;
              }

              .card-bg {
                height: 0px;
                padding-top: 109.2%;
              }
            }

            figure:nth-child(3n + 1) div {
              transform-origin: left center;
            }

            figure:nth-child(3n + 2) div {
              transform-origin: bottom center;

              + figcaption {
                text-align: center;
              }
            }

            figure:nth-child(3n) div {
              transform-origin: right center;

              + figcaption {
                text-align: right;
              }
            }

            figure:nth-child(1) div {
              transform-origin: left top;
            }

            figure:nth-child(2) div {
              transform-origin: center top;
            }

            figure:nth-child(3) div {
              transform-origin: right top;
            }

            figure:nth-last-child(1) div {
              transform-origin: right bottom;
            }

            figure:nth-last-child(2) div {
              transform-origin: center bottom;
            }

            figure:nth-last-child(3) div {
              transform-origin: left bottom;
            }
          `
        : css`
            grid-template-columns: repeat(40, 1fr);
            grid-template-rows: repeat(27, 1vw);
            grid-column-gap: 0;

            figure:nth-child(4) div,
            figure:nth-child(5) div {
              &:hover:before,
              &.open:before {
                background-position: center calc(50% + (var(--mouseY, 1px) / 12));
              }
            }

            figure:nth-child(1) {
              grid-area: 1 / 1 / span 12 / span 28;
            }

            figure:nth-child(2) {
              grid-area: 2 / 26 / span 13 / span 15;
            }

            figure:nth-child(3) {
              grid-area: 13 / 2 / span 16 / span 18;
            }

            figure:nth-child(4) {
              grid-row-start: 15;
            }

            figure:nth-child(5) {
              grid-row-start: 21;
            }

            figure:nth-child(4),
            figure:nth-child(5) {
              grid-column: 21 / span 19;
              grid-row-end: span 6;
            }
          `}
` as any
