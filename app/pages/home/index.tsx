import Meta from '@/components/meta'
import Quote from '@/components/quote'
import Slideshow from '@/components/slideshow'
import Images from '@/pages/home/images'
import { Post } from '@/server/schema'
import { Grid } from '@/theme'
import { ApolloClient } from 'apollo-boost'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import {
  compose,
  lifecycle,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

interface TInner {
  client: ApolloClient<{}>
  animTarget?: Partial<Post> & {
    el: HTMLElement
  }
}

interface TState {
  setAnimTarget: (a?: TInner['animTarget'], cb?: () => void) => void
}

interface THandlers {
  onMove: React.MouseEventHandler<any>
  onMouse: React.MouseEventHandler<any>
  onReset: () => void
}

export default compose<TInner & THandlers & TState, TInner>(
  setDisplayName('homepage'),
  withApollo,
  withState('animTarget', 'setAnimTarget', {}),
  withHandlers<TState & TInner, THandlers>(() => ({
    onMove: () => ({ clientX, clientY, target, currentTarget }) => {
      const { innerWidth, innerHeight } = window

      const x = clientX - innerWidth / 2
      const y = clientY - innerHeight / 2

      if (
        target instanceof HTMLElement &&
        target.classList.contains('card-bg')
      ) {
        const { clientWidth } = target.nextElementSibling.firstElementChild
        const cx = Math.min(innerWidth - clientWidth, clientX - clientWidth / 2)

        currentTarget.style.setProperty('--captionX', `${Math.max(-10, cx)}px`)
      }

      currentTarget.style.setProperty('--mouseX', `${x}px`)
      currentTarget.style.setProperty('--mouseY', `${y}px`)
    },

    onMouse: ({ setAnimTarget, animTarget, client }) => async ({
      button,
      type,
      currentTarget
    }) => {
      console.log(button, type)
      if ('images' in animTarget) {
        return
      }

      const $single = document.getElementById('single')
      const $siblings = [].slice
        .call(document.getElementsByClassName('card-bg'))
        .filter(el => el !== currentTarget)

      if (!button && type === 'mousedown') {
        const { data } = await client.query({
          query: gql`
          {
            q(q: "*[_id == '${
              currentTarget.dataset.ref
            }'][0] { ..., 'slug': slug.current, 'images': images[].asset->{'id':assetId,url} }")
          }`
        })

        if ('q' in data) {
          currentTarget.classList.add('open')

          return setAnimTarget({
            ...data.q,
            el: currentTarget
          })
        }
      }

      for (let i = 0, l = $siblings.length; i < l; i++) {
        $siblings[i].classList[type === 'mouseenter' ? 'add' : 'remove']('out')
      }

      currentTarget.classList.remove('out')

      setTimeout(() => {
        const { innerWidth, innerHeight } = window
        const {
          top,
          right,
          bottom,
          left
        } = currentTarget.getBoundingClientRect()

        const t = Math.round(top)
        const r = Math.round(innerWidth - right - 20)
        const b = Math.round(innerHeight - bottom)
        const l = Math.round(left)

        $single.style.setProperty(
          '--clip',
          `inset(${t}px ${r}px ${b}px ${l}px)`
        )
      }, 150)
    },

    onReset: ({ setAnimTarget, animTarget }) => () => {
      const $items = document.getElementsByClassName('card-bg')

      for (let i = 0, l = $items.length; i < l; i++) {
        $items[i].classList.remove('out')
      }

      if (animTarget.el instanceof HTMLElement) {
        animTarget.el.classList.remove('open')

        window.history.replaceState(
          {},
          document.querySelector('title').textContent,
          '/'
        )

        setTimeout(() => setAnimTarget({ el: animTarget.el }), 700)
      }
    }
  })),
  lifecycle<any, {}>({
    componentDidMount() {
      if (!('browser' in process || location.pathname.endsWith('/'))) {
        return
      }

      const el = document.querySelector(
        `[data-slug='${location.pathname.substr(1)}'] .card-bg`
      )

      if (el instanceof HTMLElement) {
        const evt = document.createEvent('MouseEvents')
        evt.initEvent('mousedown', true, true)

        window.requestAnimationFrame(() => el.dispatchEvent(evt))
      }
    }
  })
)(({ animTarget, onMove, onMouse, onReset }) => (
  <>
    <Meta title="Portfolio" />

    <Grid onMouseMove={onMove}>
      <Slideshow id="single" reset={onReset} target={animTarget} />
      <Images variant="fancy" onMouse={onMouse} />

      <Quote
        copy="Though we travel the world over to find the beautiful, we must carry it with us or we find it not."
        cite="Ralph Waldo Emerson"
      />

      <Images onMouse={onMouse} />
    </Grid>
  </>
))
