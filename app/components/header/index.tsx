import { size } from '@/theme'
import Link from 'next/link'
import { rgba } from 'polished'
import { withHandlers } from 'recompose'
import styled from 'styled-components'

interface THandles {
  openStory: React.MouseEventHandler<HTMLAnchorElement>
}

export default withHandlers<{}, THandles>(() => ({
  openStory: () => ({ currentTarget }) => {
    const $single = document.getElementById('single')

    if ($single) {
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
  }
}))(({ openStory }) => (
  <Header>
    <div>
      <Link href="/">
        <a>chelly &Delta; nicholson</a>
      </Link>

      <nav>
        <Link href="/about"><a>about</a></Link>
        <Link href="/portfolio"><a>portfolio</a></Link>
        <Link href="/blog"><a>writings</a></Link>

        <span>&mdash;&mdash;</span>

        <a href="//instagram.com" target="_blank" rel="noopener">instagram</a>
        <a href="//instagram.com" target="_blank" rel="noopener">facebook</a>
      </nav>
    </div>

    <a href="javascript:;" id="open-story" onClick={openStory}>
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
  padding: ${size(1)};

  a {
    line-height: 0;
    padding: 10px 7px;
    transition: ${({ theme }) => theme.timings.base};

    &#open-story:not(.show) {
      visibility: hidden;
      pointer-events: none;
    }
  }

  &.invert a {
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
    text-transform: lowercase;
    margin-left: ${size(2)};

    span {
      opacity: 0.3;
    }
  }
`
