import favicon from '@/static/img/favicon.png'
import { colours as colourVars, fonts as fontVars } from '@/theme'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document<any> {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
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
          <meta name="robots" content="index" />

          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css"
          />

          <link rel="stylesheet" href={fontVars.family.src()} />
          <link rel="shortcut icon" href={favicon} />

          {this.props.styleTags}

          <script src="//polyfill.io/v2/polyfill.min.js?features=IntersectionObserver,MutationObserver,URL,es6" />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script
            src="//www.googletagmanager.com/gtag/js?id=UA-10405648-10"
            async
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', 'UA-10405648-10');`
            }}
          />
        </body>
      </html>
    )
  }
}
