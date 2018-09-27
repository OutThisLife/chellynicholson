import { between } from 'polished'
import styled from 'styled-components'

export const colours = {
  base: '#000',
  brand: '#E92DB8',
  bg: '#fff'
}

export const fonts = {
  size: between('9px', '12px', '320px', '2000px')
}

export const timings = {
  base: `0.3s ease-in-out`
}

// ---------------------------

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-template-rows: auto;
`

export const size = (scale: number): string => `calc(${scale} * (100vmin / 40))`

// ---------------------------

export default {
  colours,
  fonts,
  timings
}
