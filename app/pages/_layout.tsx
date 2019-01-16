import Header from '@/components/header'
import themeVars, { ChellyTheme, size } from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { compose, withProps } from 'recompose'
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider
} from 'styled-components'

interface TOutter {
  render: (a?: any) => JSX.Element
  router?: RouterProps & {
    query: {
      slug?: string
    }
  }
}

interface TInner {
  getKey: (s?: string) => string
}

export default compose<TInner & TOutter, TOutter>(
  withRouter,
  withProps(({ router: { query }, ...props }) => ({
    ...props,
    getKey: (s = '') => `${s}${query.slug || 'home'}`
  }))
)(({ render, getKey }) => (
  <ThemeProvider theme={themeVars}>
    <>
      <Header />
      <Main id="app">{render({ getKey })}</Main>
      <GlobalStyles />
    </>
  </ThemeProvider>
))

const Main = styled.main`
  padding: ${size(4)} 0;

  @media (max-width: 768px) {
    padding: ${size(8)} 0;
  }
`

const GlobalStyles = createGlobalStyle`
${({ theme }: ChellyTheme) => css`
  html {
    color: ${theme.colours.base};
    font-weight: 500;
    font-family: ${theme.fonts.family.copy}, Helvetica Neue, Arial, Helvetica,
      sans-serif;
    font-size: ${theme.fonts.copy};
    line-height: 1.75;
    letter-spacing: 0.03em;
  }

  @media (max-width: 2000px) {
    html {
      font-size: 12px;
    }
  }

  body {
    overflow-y: scroll;
  }

  ::selection {
    color: #fff;
    background: ${theme.colours.brand};
  }

  * {
    box-sizing: border-box;
  }

  *:focus,
  *:active {
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: 1rem;
    font-family: ${theme.fonts.family.title}, Georgia, serif;
    line-height: 1;
  }

  h1 {
    font-size: ${theme.fonts.h1};
  }

  h2 {
    font-size: ${theme.fonts.h2};
    line-height: 1.5;
  }

  p,
  q,
  blockquote {
    font-size: ${theme.fonts.copy};
    quotes: '\\201C' '\\201D' '\\2018' '\\2019';
  }

  a {
    color: ${theme.colours.base};
    text-decoration: none;
  }
  a:hover {
    color: inherit;
    text-decoration: underline;
  }

  svg,
  img,
  iframe,
  object {
    max-width: 100%;
    height: auto;
  }

  #app *::-webkit-scrollbar {
    width: 3px;
    background: transparent;
  }

  #app *::-webkit-scrollbar-thumb {
    background: ${theme.colours.base};
  }
`}`
