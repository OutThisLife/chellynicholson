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
      const $header = document.querySelector('header')
      const targets = document.getElementById('single')

      window.requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window
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
            run: ({ progress }) => progress >= 20 && $header.classList.add('invert'),
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
            run: () => $header.classList.remove('invert'),
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
            ],
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
        width: 40%;
        height: 100%;
      }

      &:first-child {
        cursor: url(/static/img/icon-left.svg), auto;
        left: 0;
        background: linear-gradient(to right, #00000047, transparent);
      }

      &:nth-child(2) {
        z-index: 2;
        left: 50%;
        bottom: ${size(1)};
        width: 32px;
        height: 32px;
        transform: translateX(-50%);
        background: url(/static/img/icon-x.svg) center / cover no-repeat;
      }

      &:last-child {
        cursor: url(/static/img/icon-right.svg), auto;
        right: 0;
        background: linear-gradient(to left, #00000047, transparent);
      }
    }
  }

  figure {
    display: inline-block;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: fixed center top / cover no-repeat;
  }
`
