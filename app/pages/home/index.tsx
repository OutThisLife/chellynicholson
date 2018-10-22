import Quote from '@/components/quote'
import Images from '@/pages/home/images'
import { Grid } from '@/theme'
import { compose, withHandlers, withState } from 'recompose'

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
    onMove: () => ({ clientX, clientY, target, currentTarget }) => {
      const { innerWidth, innerHeight } = window

      const x = clientX - innerWidth / 2
      const y = clientY - innerHeight / 2

      if (target instanceof HTMLElement && target.classList.contains('card-bg')) {
        const { clientWidth } = target.nextElementSibling.firstElementChild
        const cx = Math.min(innerWidth - clientWidth, clientX - clientWidth / 2)

        currentTarget.style.setProperty('--captionX', `${Math.max(-10, cx)}px`)
      }

      currentTarget.style.setProperty('--mouseX', `${x}px`)
      currentTarget.style.setProperty('--mouseY', `${y}px`)
    },

    onMouse: ({ setAnimTarget, animTarget }) => ({ button, type, currentTarget }) => {
      if (animTarget) {
        return
      }

      const $single = document.getElementById('single')
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

        $single.style.setProperty('--clip', `inset(${t}px ${r}px ${b}px ${l}px)`)
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
    {/* <Slideshow id="single" reset={onReset} path={animTarget ? animTarget.dataset.path : undefined} /> */}

    <Images path="Featured" variant="fancy" onMouse={onMouse} />
    <Quote />
    <Images path="Portfolio" onMouse={onMouse} />
  </Grid>
))
