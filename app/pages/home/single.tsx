import Slideshow from '@/components/slideshow'
import faker from 'faker'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import styled from 'styled-components'

interface TOutter {
  animTarget?: HTMLElement
  reset: () => void
}

interface THandles {
  toggle?: (isOpen: boolean) => void
  exit?: React.MouseEventHandler<any>
}

export default compose<THandles & TOutter, TOutter>(
  withHandlers<TOutter, THandles>(() => ({
    toggle: ({ reset }) => (isOpen = false) =>
      window.requestAnimationFrame(() => {
        const $single = document.getElementById('single')
        const $header = document.querySelector('header')
        const $story = $header.querySelector('a:last-child')

        if (isOpen) {
          ;(window as any).lastY = window.scrollY

          $story.textContent = 'story'
          $single.classList.add('in')

          window.requestAnimationFrame(() => {
            $header.classList.add('invert')

            document.body.style.position = 'fixed'
            document.body.style.top = `${-window.scrollY}px`
            document.body.style.height = '100vh'

            window.scrollTo(0, 0)

            $story.classList.add('show')
          })

          return
        }

        $single.classList.remove('in')

        window.requestAnimationFrame(() => {
          $header.classList.remove('invert')
          $story.className = ''
          document.body.style.position = ''
          document.body.style.top = ''
          document.body.style.height = ''

          window.scrollTo(0, (window as any).lastY)
          reset()
        })
      })
  })),
  withHandlers<TOutter & THandles, THandles>(() => ({
    exit: ({ toggle }) => ({ button }) => !button && toggle(false)
  })),
  withPropsOnChange<TOutter, TOutter & THandles>(['animTarget'], props => {
    if (typeof window === 'undefined') {
      return props
    }

    if (props.animTarget) {
      props.toggle(true)
    }

    return props
  })
)(({ exit, animTarget }) => (
  <Single
    id="single"
    onExit={exit}
    slides={
      !animTarget
        ? []
        : [
            {
              src: (animTarget.children[0] as HTMLImageElement).src,
              copy: faker.lorem.words()
            }
          ]
    }
  />
))

const Single = styled(Slideshow)`
  z-index: 50;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  clip-path: var(--clip, inset(0% 0% 100% 0%));
  transition: ${({ theme }) => theme.timings.base};

  &:not(.in) {
    visibility: hidden;
    pointer-events: none;
  }

  &.in {
    --clip: inset(0% 0% 0% 0%) !important;

    + * {
      pointer-events: none;
    }
  }

  figure {
    opacity: inherit;
    display: inline-block;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: fixed center top / cover no-repeat;
  }
` as any
