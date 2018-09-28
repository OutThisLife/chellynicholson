import { between, timingFunctions } from 'polished'
import styled, { keyframes } from 'styled-components'

export const colours = {
  base: '#000',
  brand: '#E92DB8',
  bg: '#fff'
}

export const fonts = {
  size: between('9px', '12px', '320px', '2000px'),

  family: {
    title: 'Elsie',
    copy: 'Josefin Sans',
    src() {
      const fmt = (s: string): string => s.replace(' ', '+')
      return `//fonts.googleapis.com/css?family=${fmt(this.title)}|${fmt(this.copy)}`
    }
  }
}

export const timings = {
  easing: timingFunctions('easeInOutCubic'),
  get base() { return `0.33s ${this.easing}` },
  get fast() { return `0.15s ${this.easing}` }
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

// ---------------------------

export const glitch = keyframes`
  0% {
		background-position: center;
		filter: hue-rotate(0deg);
	} 33% {
		background-position: calc(50% + 5px) center;
	} 99% {
		background-position: calc(50% - 5px) calc(50% + 5px);
	} 100% {
		background-position: center;
		filter: hue-rotate(360deg);
	}
`
