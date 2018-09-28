import Header from '@/components/header'
import themeVars, { size } from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { compose, withProps } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'

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

      <Main id="app">
        {render({ getKey })}
      </Main>
    </>
  </ThemeProvider>
))

const Main = styled.main`
  padding: ${size(4)} 0;

  @media (max-width: 768px) {
    padding: ${size(8)} 0;
  }
`
