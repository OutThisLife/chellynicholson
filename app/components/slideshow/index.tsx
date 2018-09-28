import { size } from '@/theme'
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose'
import styled from 'styled-components'

interface TOutter {
  id: string
  reset: () => void
  data: {
    title?: string
    copy?: string
    slides: string[]
  }
}

interface TState {
  slide: number
  setSlide?: (slide: number, cb?: () => void) => number
}

interface THandles {
  goToSlide?: (nextSlide: number) => void
  toggle?: (isOpen: boolean) => void

  prev?: React.MouseEventHandler<any>
  next?: React.MouseEventHandler<any>
  exit?: React.MouseEventHandler<any>
}

export default compose<TOutter & THandles & TState, TOutter>(
  withState('slide', 'setSlide', 0),
  withHandlers<TState & TOutter, THandles>(() => ({
    goToSlide: ({ setSlide, slide }) => nextSlide =>
      window.requestAnimationFrame(() => {
        const $single = document.getElementById('single')
        const $items = $single.getElementsByTagName('figure')

        const $current = $items[slide]
        const $next = $items[nextSlide]

        $next.classList.add('no-anim')

        setSlide(nextSlide, () => {
          const outX = nextSlide > slide ? -100 : 100

          $current.style.transform = `translate3d(${outX}%, 0, 0)`
          $next.style.transform = `translate3d(${outX * -1}%, 0, 0)`

          window.requestAnimationFrame(() => {
            $next.classList.remove('no-anim')
            $next.style.transform = `translate3d(0, 0, 0)`
          })
        })
      }),
    toggle: ({ reset }) => (isOpen = false) =>
      window.requestAnimationFrame(() => {
        const $single = document.getElementById('single')
        const $header = document.querySelector('header')
        const $story = document.getElementById('story')

        if (isOpen) {
          ;(window as any).lastY = window.scrollY

          $story.textContent = 'story'
          $single.classList.add('in')

          window.requestAnimationFrame(() => {
            $header.classList.add('invert')

            document.body.style.position = 'fixed'
            document.body.style.top = `${-(window as any).lastY}px`
            document.body.style.height = '100vh'

            setTimeout(() => window.scrollTo(0, 0), 25)

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

          setTimeout(() => window.scrollTo(0, (window as any).lastY), 25)
          reset()
        })
      })
  })),
  withHandlers<TState & TOutter & THandles, THandles>(() => ({
    prev: ({ slide, goToSlide }) => () => goToSlide(Math.max(0, slide - 1)),
    next: ({ slide, goToSlide, data }) => () => goToSlide(Math.min(data.slides.length - 1, slide + 1)),
    exit: ({ setSlide, toggle }) => ({ button }) => !button && setSlide(0, () => toggle(false))
  })),
  withPropsOnChange<TOutter, TOutter & THandles>(['data', 'slide'], props => {
    if (typeof window === 'undefined') {
      return props
    }

    if (props.data.slides.length) {
      props.toggle(true)
    }

    return props
  })
)(({ slide, prev, next, exit, data, ...props }) => (
  <Slideshow {...props}>
    <nav>
      <a href="javascript:;" disabled={slide === 0} onClick={prev}>
        Prev
      </a>

      <a href="javascript:;" onClick={exit}>
        Exit
      </a>

      <a href="javascript:;" disabled={slide === data.slides.length - 1} onClick={next}>
        Next
      </a>
    </nav>

    {data.slides.map((src, i) => (
      <figure key={src} className={i === slide ? 'active' : ''} style={{ backgroundImage: `url(${src})` }} />
    ))}

    {'title' in data && (
      <figcaption>
        <div>
          <h2>{data.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.copy }} />
        </div>
      </figcaption>
    )}
  </Slideshow>
))

const Slideshow = styled.div`
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
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    background: fixed ${({ theme }) => theme.colours.base} center top / cover no-repeat;

    &:not(.no-anim) {
      transition: transform ${({ theme }) => theme.timings.base};

      &:not(.active) {
        transition-delay: 0.033s;
      }
    }

    &.active {
      z-index: 1;
    }

    &:nth-child(3) {
      transform: translate3d(100%, 0, 0);
    }
  }

  figcaption {
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 33vw;
    overflow: auto;
    padding: ${size(3)} 0 ${size(2)};
    will-change: transform;
    transition: ${({ theme }) => theme.timings.base};
    background: ${({ theme }) => theme.colours.bg};

    @media (max-width: 768px) {
      top: ${size(5)};
      right: ${size(2)};
      left: ${size(2)};
      width: auto;
    }

    > div {
      height: 100%;
      padding: 0 ${size(2)};
      overflow: auto;
    }

    &:not(.open) {
      pointer-events: none;
      transform: translate3d(100%, 0, 0);

      @media (max-width: 768px) {
        opacity: 0;
        transform: none;
      }
    }

    h2 {
      margin: 4rem 0 2rem;
    }
  }

  nav {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    a {
      z-index: 1;
      display: block;
      position: absolute;
      width: 40%;
      height: 100%;
      color: transparent !important;

      &[disabled] {
        pointer-events: none;
      }

      &:first-child {
        cursor: url(/static/img/icon-left.svg), auto;
        left: 0;
        background: linear-gradient(to right, rgba(0,0,0,0.7), transparent);
      }

      &:nth-child(2) {
        cursor: url(/static/img/icon-x.svg), auto;
        left: 40%;
        width: 20%;
      }

      &:last-child {
        cursor: url(/static/img/icon-right.svg), auto;
        right: 0;
        background: linear-gradient(to left, rgba(0,0,0,0.7), transparent);
      }
    }
  }
` as any
