import { size } from '@/theme'
import anime from 'animejs'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import styled from 'styled-components'

import { AnimTarget } from '.'

interface TOutter {
  target?: AnimTarget
}

interface THandles {
  toggle?: () => void
  exit?: React.MouseEventHandler<any>
}

export default compose<THandles & TOutter, TOutter>(
  withHandlers<TOutter, THandles>(() => ({
    toggle: ({ target: { el, isOpen } }) => () => {
      const targets = document.getElementById('single')
      const { innerWidth, innerHeight } = window

      window.requestAnimationFrame(() => {
        const { top, right, bottom, left } = el.getBoundingClientRect()

        const t = Math.round(top)
        const r = Math.round(innerWidth - right - 20)
        const b = Math.round(innerHeight - bottom)
        const l = Math.round(left)

        const clip = `inset(${t}px ${r}px ${b}px ${l}px)`

        if (isOpen()) {
          window.requestAnimationFrame(() => anime({
            targets,
            easing: 'easeOutExpo',
            opacity: {
              duration: 70,
              value: 1
            },
            clipPath: [
              {
                duration: 0,
                value: clip
              },
              {
                duration: 300,
                value: 'inset(0px 0% 0% 0px)'
              }
            ]
          }))
        } else {
          window.requestAnimationFrame(() => anime({
            targets,
            easing: 'easeOutExpo',
            opacity: {
              duration: 300,
              delay: 200,
              value: 0
            },
            clipPath: [
              {
                duration: 300,
                value: clip
              }
            ]
          }))
        }
      })
    }
  })),
  withHandlers<TOutter & THandles, THandles>(() => ({
    exit: ({  target: { el }, toggle }) => ({ button }) => !button && (el.classList.remove('open') || toggle())
  })),
  withPropsOnChange<TOutter, TOutter & THandles>(['target'], props => {
    if (typeof window === 'undefined') {
      return props
    }

    if ('target' in props && props.target.el instanceof HTMLElement) {
      props.toggle()
    }

    return props
  })
)(({ exit, target: { el } }) => (
  <Single id="single">
    <nav>
      <a href="javascript:;">Prev</a>
      <a href="javascript:;" onClick={exit}>Exit</a>
      <a href="javascript:;">Next</a>
    </nav>

    <figure style={{ backgroundImage: `url(${(el.children[0] as HTMLImageElement).src})` }} />
  </Single>
))

const Single = styled.div`
  opacity: 0;
  z-index: 50;
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &[style*='opacity: 1'] {
    pointer-events: auto;

    + * {
      pointer-events: none;
    }
  }

  nav {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    a {
      display: block;
      position: absolute;
      color: transparent;

      &:not(:nth-child(2)) {
        z-index: 1;
        width: 50%;
        height: 100%;
      }

      &:first-child {
        left: 0;
        width: 32px;
        height: 32px;
        cursor: url(/static/img/icon-left.svg) 10 20, auto;
      }

      &:nth-child(2) {
        z-index: 2;
        left: 50%;
        bottom: ${size(1)};
        transform: translateX(-50%);
        background: url(/static/img/icon-x.svg) center / cover no-repeat;
      }

      &:last-child {
        right: 0;
        cursor: url(/static/img/icon-right.svg) 10 20, auto;
      }
    }
  }

  figure {
    display: inline-block;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: fixed center / cover no-repeat;
  }
`
