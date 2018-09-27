import Gallery, { Card } from '@/components/gallery'
import { Grid } from '@/theme'
import { compose, withHandlers, withState } from 'recompose'
import styled from 'styled-components'

import Single from './single'

export interface AnimTarget {
  el?: HTMLElement
  isOpen: () => boolean
}

interface TInner {
  animTarget: AnimTarget
}

interface TState {
  setAnimTarget: (a: AnimTarget) => void
}

interface THandlers {
  onMove: React.MouseEventHandler<any>
  onMouse: React.MouseEventHandler<any>
}

export default compose<TInner & THandlers, TInner>(
  withState('animTarget', 'setAnimTarget', {
    el: undefined,
    isOpen: () => false
  }),
  withHandlers<TState, THandlers>(() => ({
    onMove: () => ({ clientX, clientY, currentTarget }) => {
      const str = 10
      const mx = window.innerWidth / 2
      const my = window.innerHeight / 2

      window.requestAnimationFrame(() => {
        currentTarget.style.setProperty('--captionX', `${(clientX - mx) / str}px`)
        currentTarget.style.setProperty('--captionY', `${(clientY - my) / str}px`)
      })
    },
    onMouse: ({ setAnimTarget }) => ({ button, type, currentTarget }) => {
      const $siblings = [].slice.call(document.getElementsByClassName('card-bg')).filter(el => el !== currentTarget)

      if (!button && type === 'mousedown') {
        currentTarget.classList.toggle('open')

        setAnimTarget({
          el: currentTarget,
          isOpen: () => currentTarget.classList.contains('open')
        })

        return
      }

      for (let i = 0, l = $siblings.length; i < l; i++) {
        $siblings[i].classList[type === 'mouseenter' ? 'add' : 'remove']('out')
      }

      currentTarget.classList.remove('out')
    }
  }))
)(({ animTarget, onMove, onMouse }) => (
  <Home onMouseMove={onMove}>
    {typeof animTarget.el === 'object' && <Single target={animTarget} />}

    <Gallery>
      {[...Array(3 * 3).keys()].map(i => (
        <Card
          key={`card-${i}`}
          img={`//picsum.photos/800/${!(i % 2) ? 600 : 800}/?image=${i % 2 ? 1025 : 1066}`}
          onMouse={onMouse}
        />
      ))}
    </Gallery>
  </Home>
))

const Home = styled(Grid)`
  --captionX: 0;
  --captionY: 0;
`
