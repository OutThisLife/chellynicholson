import { ApolloServer } from 'apollo-server-express'
import * as compression from 'compression'
import * as express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import * as helmet from 'helmet'
import * as LRU from 'lru-cache'
import * as morgan from 'morgan'
import * as next from 'next'
import * as path from 'path'

import schema from './schema'

const dev = process.env.NODE_ENV !== 'production'

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = parseInt(process.env.PORT, 10) || 3000

const nextApp = next({ dir, dev, quiet: true })
const handle = nextApp.getRequestHandler()

export const cache = new LRU({
  max: 3e6,
  maxAge: 36e2
})

// -----------------------------------------

const render = (page = '/') => (
  req: express.Request,
  res: express.Response
) => {
  const key = req.url

  if (!dev && cache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(cache.get(key))
    return
  }

  try {
    ;(async () => {
      const html = await nextApp.renderToHTML(req, res, page, req.params)

      if (res.statusCode !== 200) {
        res.send(html)
        return
      }

      cache.set(key, html)

      res.setHeader('x-cache', 'MISS')
      res.send(html)
    })()
  } catch (err) {
    nextApp.renderError(err, req, res, req.query)
  }
}

// -----------------------------------------

nextApp.prepare().then(() => {
  const app = express()

  app
    .use(helmet())
    .use(morgan('combined', {}))
    .use(
      compression({
        level: 6,
        filter: () => true
      })
    )

    .use(({ secure, headers, hostname, url }, res, resolve) => {
      if (!dev && !secure && headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${hostname}${url}`)
      }

      return resolve()
    })

    .use((req, res, resolve) => {
      if (!('API_URL' in nextApp.nextConfig.publicRuntimeConfig)) {
        Object.defineProperty(
          nextApp.nextConfig.publicRuntimeConfig,
          'API_URL',
          {
            value: `${req.protocol}://${req.headers.host}/graphql`
          }
        )
      }

      let staticUrl

      if (req.url.endsWith('service-worker.js')) {
        staticUrl = path.join(dir, `./.next/${req.url}`)
      } else if (/(robots\.txt)$/.test(req.url)) {
        staticUrl = path.join(dir, `./static/${req.url}`)
      }

      if (staticUrl) {
        return nextApp.serveStatic(req, res, staticUrl)
      }

      return resolve()
    })

  new ApolloServer(schema).applyMiddleware({ app })

  app
    .get('/', render('/home'))

    .get('/about', render('/about'))
    .get('/blog', render('/blog'))

    .get('/blog/:slug([a-zA-Z0-9.-]+)', render('/blog/single'))
    .get('/:slug([a-zA-Z0-9.-]+)', render('/home/single'))

    .get('*', handle as RequestHandlerParams)

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`> ready on http://[::1]:${port}\n🚀`)
    })
})
