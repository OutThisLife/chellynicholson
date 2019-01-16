import { size } from '@/theme'
import styled from 'styled-components'

export default ({ copy, cite }: { copy: string; cite: string }) => (
  <Quote>
    <q dangerouslySetInnerHTML={{ __html: copy }} />
    <cite>&mdash; {cite}</cite>
  </Quote>
)

const Quote = styled.blockquote`
  grid-column: 12 / -12;
  margin: ${size(2)} auto 0;
  padding: ${size(4)} ${size(1)};

  @media (max-width: 1300px) {
    grid-column: 6 / -6;
  }

  @media (max-width: 768px) {
    grid-column: 3 / -3;
  }

  q,
  cite {
    display: block;
  }

  q {
    font-size: 4rem;
    text-align: center;
    margin-bottom: -0.07em;
  }

  cite {
    font-size: 1.4rem;
    line-height: 0;
    font-family: ${({ theme }) => theme.fonts.family.title};
    text-align: right;
    transform: translate(0.2em, 0);
  }
`
