import { size } from '@/theme'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { rgba } from 'polished'
import { compose, setDisplayName, withHandlers } from 'recompose'
import styled from 'styled-components'

interface THandles {
  openStory: React.MouseEventHandler<HTMLAnchorElement>
}

export default compose<WithRouterProps & THandles, {}>(
  setDisplayName('header'),
  withRouter,
  withHandlers<{}, THandles>(() => ({
    openStory: () => ({ currentTarget }) => {
      const $single = document.getElementById('single')
      const $story = $single.querySelector('figcaption')

      if ($story) {
        currentTarget.classList.toggle('invert')
        $story.classList.toggle('open')

        if ($story.classList.contains('open')) {
          currentTarget.textContent = 'close'
        } else {
          currentTarget.textContent = 'story'
        }
      }
    }
  }))
)(({ router, openStory }) => (
  <Header>
    <Link href="/">
      <a id="logo">chelly &Delta; nicholson</a>
    </Link>

    <nav>
      <Link href="/">
        <a className={router.asPath === '/' ? 'active' : ''}>portfolio</a>
      </Link>

      <Link prefetch href="/about">
        <a className={router.route === '/about' ? 'active' : ''}>about</a>
      </Link>

      <Link prefetch href="/blog">
        <a className={/blog/.test(router.asPath) ? 'active' : ''}>blog</a>
      </Link>

      <a href="//instagram.com/chellynicholson" target="_blank" rel="noopener">
        [ig]
      </a>

      <a
        href="//facebook.com/chellynicholsonphotography"
        target="_blank"
        rel="noopener">
        [fb]
      </a>
    </nav>

    <a href="javascript:;" id="story" onClick={openStory}>
      story
    </a>
  </Header>
))

export const Header = styled.header`
  z-index: 100;
  display: grid;
  grid-template-columns: 0px 1fr auto;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${size(1)};

  @media (max-width: 768px) {
    &:not(.invert) {
      background: ${({ theme }) => theme.colours.bg};
    }
  }

  a {
    display: inline-block;
    line-height: 1;
    text-transform: lowercase;
    margin: 0 7px;
    border-bottom: 1px solid transparent;
    transition: ${({ theme }) => theme.timings.base};

    &.active {
      text-decoration: underline;
    }

    &#logo {
      text-transform: uppercase;

      @media (min-width: 768px) {
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        display: block;
        width: 100%;
        line-height: inherit;
        padding: 10px 7px 0;
      }
    }

    &#story:not(.show) {
      visibility: hidden;
      pointer-events: none;
    }
  }

  &.invert a,
  &.invert span {
    color: ${({ theme }) => theme.colours.bg};
    text-shadow: 1px 2px 3px ${({ theme }) => rgba(theme.colours.base, 0.3)};

    &.invert {
      @media (min-width: 768px) {
        color: ${({ theme }) => theme.colours.base};
      }
    }
  }

  nav {
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
      margin-left: ${size(2)};
    }

    span {
      opacity: 0.3;
    }
  }
`
