'use client'
import { useEffect, useState, useRef } from 'react'
import { AnimatedBlobs } from '@/components/Animation/AnimatedBlobs'
import { TitleBlock } from '@/components/TitleBlock/TitleBlock'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import { Contact } from '@/components/Contact/Contact'
import './Home.css'
import { darkThemeColors, lightThemeColors } from '@/config/themeColors'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [linkClickCount, setLinkClickCount] = useState<number>(0)
  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(false)
  const [screenSplitted, setScreenSplitted] = useState<boolean>(false)
  const [animationIsBlurred, setAnimationBlurred] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<String>()
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
    //dynamically setting the page height to avoid bugs with 100vh in mobile
    root.style.setProperty('--doc-height', `${window.innerHeight}px`)
    setLoading(false)

    const timeOut = setTimeout(() => {
      setTitleIsVisible(true)
      setAnimationBlurred(true)
    }, 1000)
  }, [])

  useEffect(() => {
    const rootElement = document.documentElement
    //manage theme changes

    switch (theme) {
      case 'auto':
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          applyThemeColors(rootElement, 'dark')
        } else {
          applyThemeColors(rootElement, 'light')
        }
        break
      case 'dark':
        applyThemeColors(rootElement, 'dark')
        break
      case 'light':
        applyThemeColors(rootElement, 'light')
      default:
        break
    }
  }, [theme])

  const handleLinkClick = (link: String) => {
    setLinkClickCount((prevState) => prevState + 1)
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
              activeLink={activeLink ?? ''}
            />
            <ThemeSwitcher
              titleIsVisible={titleIsVisible}
              currentTheme={theme}
              setTheme={setTheme}
            />
          </div>

          <div className={`content ${screenSplitted && `content-opened`}`}>
            {activeLink === 'About' ? (
              <About firstClick={linkClickCount == 1 ? true : false} />
            ) : activeLink === 'Projects' ? (
              <Projects firstClick={linkClickCount == 1 ? true : false} />
            ) : activeLink === 'Contact' ? (
              <Contact firstClick={linkClickCount == 1 ? true : false} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className='loading' />
      )}
    </main>
  )
}
