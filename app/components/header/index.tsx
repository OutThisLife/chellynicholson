import { size } from '@/theme'
import styled from 'styled-components'

export default () => (
  <Header>
    <a href="javascript:;">overview</a>
    <a href="/">chelly &Delta; nicholson</a>
    <a href="javascript:;">read story</a>
  </Header>
)

export const Header = styled.header`
  z-index: 100;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${size(1)};

  a {
    line-height: 0;
    padding: 10px 7px;
    transition: ${({ theme }) => theme.timings.base};
  }
`
