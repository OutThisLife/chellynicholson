import { size } from '@/theme'
import styled from 'styled-components'

export default () => (
  <Quote>
    <q>Though we travel the world over to find the beautiful, we must carry it with us or we find it not.</q>
    <cite>&mdash;Ralph Waldo Emerson</cite>
  </Quote>
)

const Quote = styled.blockquote`
  grid-column: 12 / -12;
  text-transform: initial;
  quotes: "\\201C" "\\201D" "\\2018" "\\2019";
  margin: ${size(2)} auto 0;
  padding: ${size(4)} ${size(1)};

  @media (max-width: 1300px) {
    grid-column: 6 / -6;
  }

  @media (max-width: 768px) {
    grid-column: 3 / -3;
  }

  q, cite {
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
