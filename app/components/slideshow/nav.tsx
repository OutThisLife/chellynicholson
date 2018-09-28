import styled from 'styled-components'

interface TInner {
  onPrev?: React.MouseEventHandler<any>
  onExit?: React.MouseEventHandler<any>
  onNext?: React.MouseEventHandler<any>
}

export default ({ onExit }: TInner) => (
  <Nav>
    <a href="javascript:;">Prev</a>

    <a href="javascript:;" onClick={onExit}>
      Exit
    </a>

    <a href="javascript:;">Next</a>
  </Nav>
)

const Nav = styled.nav`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  a {
    z-index: 1;
    display: block;
    position: absolute;
    width: 40%;
    height: 100%;
    color: transparent;

    &:first-child {
      cursor: url(/static/img/icon-left.svg), auto;
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.7), transparent);
    }

    &:nth-child(2) {
      cursor: url(/static/img/icon-x.svg), auto;
      left: 40%;
      width: 20%;
    }

    &:last-child {
      cursor: url(/static/img/icon-right.svg), auto;
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.7), transparent);
    }
  }
`
