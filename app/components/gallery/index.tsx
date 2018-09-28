import { size } from '@/theme'
import styled from 'styled-components'

export { default as Card } from '@/components/card'

export default ({ children }) => <Gallery>{children}</Gallery>

const Gallery = styled.section`
  grid-column: 3 / -3;
  display: inherit;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${size(2)};
  position: relative;
  padding: ${size(4)} 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
