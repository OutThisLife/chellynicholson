import styled from 'styled-components'

import { Header } from '../header'

export default () => (
  <Footer>
    <span>
      <a href="javascript:;">instagram</a>
      <a href="javascript:;">facebook</a>
    </span>
    <span />
    <span>&copy;{(new Date()).getFullYear()}</span>
  </Footer>
)

const Footer = styled(Header)`
  z-index: 30;
  top: auto;
  bottom: 0;

  span > a + a {
    margin-left: 1.7em;
  }
`
