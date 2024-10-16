'use client'
import { About } from '@/components/About/About'
import { AnimatedBlobs } from '@/components/AnimatedBlobs/AnimatedBlobs'
import { Contact } from '@/components/Contact/Contact'
import { Projects } from '@/components/Projects/Projects'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import { TitleBlock } from '@/components/TitleBlock/TitleBlock'
import { darkThemeColors, lightThemeColors } from '@/config/themeColors'
import { useClickCount } from '@/context/useClickCount'
import { useEffect, useState } from 'react'
import './Home.css'

const TITLE_ANIMATION_DURATION = 1000

export default function Home() {
  const { clickCount, setClickCount } = useClickCount()

  const [loading, setLoading] = useState<boolean>(true)
  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(false)
  const [screenSplitted, setScreenSplitted] = useState<boolean>(false)
  const [animationIsBlurred, setAnimationBlurred] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<String | null>(null)
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto')

  const applyThemeColors = (
    rootElement: HTMLElement,
    theme: 'dark' | 'light'
  ) => {
    let themeColors = {}

    if (theme === 'light') {
      themeColors = lightThemeColors
    } else {
      themeColors = darkThemeColors
    }

    for (const [key, value] of Object.entries(themeColors)) {
      rootElement.style.setProperty(key as string, value as string)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    //dynamically setting the page height at page mount to avoid bugs with 100vh in mobile
    root.style.setProperty('--doc-height', `${window.innerHeight}px`)
    setLoading(false)

    //title blob animation
    const timeOut = setTimeout(() => {
      setTitleIsVisible(true)
      setAnimationBlurred(true)
    }, TITLE_ANIMATION_DURATION)

    //Cleanup timeout
    return () => {
      clearTimeout(timeOut);
    };
  }, [])

  //manage theme changes
  useEffect(() => {
    handleThemeChanges(theme)
  }, [theme])

  const handleThemeChanges = (theme: 'auto' | 'dark' | 'light') => {
    const rootElement = document.documentElement

    switch (theme) {
      case 'auto':
        const isDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        isDarkMode
          ? applyThemeColors(rootElement, 'dark')
          : applyThemeColors(rootElement, 'light')
        break
      case 'dark':
        applyThemeColors(rootElement, 'dark')
        break
      case 'light':
        applyThemeColors(rootElement, 'light')
      default:
        break
    }
  }

  const handleLinkClick = (link: String) => {
    // tracking click count in global context as it is needed for animation of other components
    setClickCount(clickCount + 1)
    setScreenSplitted(true)
    setActiveLink(link)
  }

  const links = ['About', 'Projects', 'Contact']

  return (
    <main>
      {!loading ? (
        <div className='screen'>
          <div className={`hero ${screenSplitted && `hero-splitted`}`}>
            <AnimatedBlobs isBlurred={animationIsBlurred} />
            <TitleBlock
              isVisible={titleIsVisible}
              isSmall={screenSplitted}
              onLinkClick={handleLinkClick}
              links={links}
              activeLink={activeLink}
            />
            <ThemeSwitcher
              isVisible={titleIsVisible}
              currentTheme={theme}
              setTheme={setTheme}
            />
          </div>

          <div className={`content ${screenSplitted && `content-opened`}`}>
            {activeLink === 'About' && <About />}
            {activeLink === 'Projects' && <Projects />}
            {activeLink === 'Contact' && <Contact />}
          </div>
        </div>
      ) : (
        <div className='loading' />
      )}
    </main>
  )
}
