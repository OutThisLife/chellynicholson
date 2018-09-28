import { colours as colourVars, fonts as fontVars } from '@/theme'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  public render() {
    return (
      <html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={colourVars.brand} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />

          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css" />
          <link rel="stylesheet" href={fontVars.family.src()} />

          {this.props.styleTags}

          <style>{`
          html {
            color: ${colourVars.base};
            font-weight: 500;
            font-family: ${fontVars.family.copy}, Helvetica Neue, Arial, Helvetica, sans-serif;
            font-size: ${fontVars.size};
            line-height: 1.75;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          @media (max-width: 2000px) {
            html { font-size: 12px; }
          }

          body {
            overflow-y: scroll;
          }

          h1,h2,h3,h4,h5,h6 {
            font-weight: inherit;
            font-size: 1rem;
            font-family: ${fontVars.family.title}, Georgia, serif;
            line-height: 1;
          }

          ::selection {
            color: #FFF;
            background: ${colourVars.brand};
          }

          * {
            box-sizing: border-box;
          }

          *:focus,
          *:active {
            outline: none;
          }

          a {
            color: ${colourVars.base};
            text-decoration: none;
          }
            a:hover {
              color: inherit;
              text-decoration: underline;
            }

          #app *::-webkit-scrollbar {
            width: 3px;
            background: transparent;
          }

          #app *::-webkit-scrollbar-thumb {
            background: ${colourVars.base};
          }
          `}</style>

          <script src="//polyfill.io/v2/polyfill.min.js?features=IntersectionObserver,MutationObserver,URL,es6" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
