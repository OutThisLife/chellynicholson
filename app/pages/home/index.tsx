import Gallery, { Card } from '@/components/gallery'
import { Grid } from '@/theme'
import { compose, withHandlers, withState } from 'recompose'

import Single from './single'

interface TInner {
  animTarget?: HTMLElement
}

interface TState {
  setAnimTarget: (a?: HTMLElement, cb?: () => void) => void
}

interface THandlers {
  onMove: React.MouseEventHandler<any>
  onMouse: React.MouseEventHandler<any>
  onReset: () => void
}

export default compose<TInner & THandlers & TState, TInner>(
  withState('animTarget', 'setAnimTarget', undefined),
  withHandlers<TState & TInner, THandlers>(() => ({
    onMove: () => ({ clientX, clientY, currentTarget }) => {
      const { innerWidth, innerHeight } = window

      const str = 10
      const mx = innerWidth / 2
      const my = innerHeight / 2

      currentTarget.style.setProperty('--captionX', `${(clientX - mx) / str}px`)
      currentTarget.style.setProperty('--captionY', `${(clientY - my) / str}px`)
    },
    onMouse: ({ setAnimTarget, animTarget }) => ({ button, type, currentTarget }) => {
      if (animTarget) {
        return
      }

      const $siblings = [].slice.call(document.getElementsByClassName('card-bg')).filter(el => el !== currentTarget)

      if (!button && type === 'mousedown') {
        currentTarget.classList.add('open')
        return setAnimTarget(currentTarget)
      }

      for (let i = 0, len = $siblings.length; i < len; i++) {
        $siblings[i].classList[type === 'mouseenter' ? 'add' : 'remove']('out')
      }

      currentTarget.classList.remove('out')

      setTimeout(() => {
        const { innerWidth, innerHeight } = window
        const { top, right, bottom, left } = currentTarget.getBoundingClientRect()

        const t = Math.round(top)
        const r = Math.round(innerWidth - right - 20)
        const b = Math.round(innerHeight - bottom)
        const l = Math.round(left)

        document.getElementById('single').style.setProperty(
          '--clip',
          `inset(${t}px ${r}px ${b}px ${l}px)`
        )
      }, 150)
    },
    onReset: ({ setAnimTarget, animTarget }) => () => {
      setAnimTarget(undefined, () => {
        const $items = document.getElementsByClassName('card-bg')

        for (let i = 0, l = $items.length; i < l; i++) {
          $items[i].classList.remove('out')
        }

        animTarget.classList.remove('open')
      })
    }
  }))
)(({ animTarget, onMove, onMouse, onReset }) => (
  <Grid onMouseMove={onMove}>
    <Single animTarget={animTarget} reset={onReset} />

    <Gallery>
      {[...Array(3 * 3).keys()].map(i => (
        <Card
          key={`card-${i}`}
          img={`//picsum.photos/800/${!(i % 2) ? 600 : 800}/?image=${i % 2 ? 1025 : 1066}`}
          onMouse={onMouse}
        />
      ))}
    </Gallery>
  </Grid>
))
