import { size } from '@/theme'
import Link from 'next/link'
import { rgba } from 'polished'
import { compose, setDisplayName, withHandlers } from 'recompose'
import styled from 'styled-components'

interface THandles {
  openStory: React.MouseEventHandler<HTMLAnchorElement>
}

export default compose<THandles, {}>(
  setDisplayName('header'),
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
)(({ openStory }) => (
  <Header>
    <Link href="/">
      <a id="logo">chelly &Delta; nicholson</a>
    </Link>

    <nav>
      <Link href="/">
        <a>portfolio</a>
      </Link>

      <Link prefetch href="/about">
        <a>about</a>
      </Link>

      <Link prefetch href="/blog">
        <a>blog</a>
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
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  white-space: nowrap;
  padding: ${size(1)};

  @media (max-width: 768px) {
    background: ${({ theme }) => theme.colours.bg};
  }

  a {
    display: inline-block;
    line-height: 0;
    padding: 10px 7px;
    text-transform: lowercase;
    transition: ${({ theme }) => theme.timings.base};

    &#logo {
      text-transform: uppercase;

      @media (max-width: 768px) {
        width: 30vw;
        line-height: inherit;
        white-space: normal;
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
    display: inline-flex;
    margin-left: ${size(2)};

    span {
      opacity: 0.3;
    }
  }
`
