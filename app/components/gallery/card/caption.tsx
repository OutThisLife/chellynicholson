import styled from 'styled-components'

export default ({ title = '' }: { title: string }) => (
  <Caption>
    <h1 dangerouslySetInnerHTML={{ __html: title.replace(/\s+/g, '<br />') }} />
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
