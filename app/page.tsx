'use client'
import { Animation } from "@/components/Animation/Animation"
import { TitleBlock } from "@/components/TitleBlock/TitleBlock"
import { About } from "@/components/About/About"
import { useEffect, useState, useRef } from "react"
import "./Home.css"

export default function Home() {

  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(false)
  const [screenSplitted, setScreenSplitted] = useState<boolean>(false)
  const [animationIsBlurred, setAnimationBlurred] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<String>()
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto')

  useEffect(
    () => {
      const timeOut = setTimeout(() => {
        setTitleIsVisible(true);
        setAnimationBlurred(true)
      }, 2000);

    }, []
  )

  useEffect(
    () => {

      const root = document.documentElement;


      function setToDark() {
        root.style.setProperty('--hero-bg-color', '#18202c');
        root.style.setProperty('--content-bg-color', 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)');
        root.style.setProperty('--font-color', 'rgb(248, 250, 252)');
      }

      function setToLight() {
        root.style.setProperty('--hero-bg-color', 'rgb(248, 250, 252)');
        root.style.setProperty('--content-bg-color', 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 3%, #8eaad4 100%)');
        root.style.setProperty('--font-color', 'darkslategray');
      }

      switch (theme) {
        case 'auto':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setToDark()
          } else {
            setToLight()
          }
          break;
        case 'dark':
          setToDark()
          break;
        case 'light':
          setToLight()
        default:
          break;
      }

    }, [theme]
  )

  const handleLinkClick = (link: String) => {
    setScreenSplitted(true)
    setActiveLink(link)
  }

  const links = [
    "About",
    "Projects",
    "Contact"
  ]

  return (
    <main>
      <div className="screen">
        <div className={`hero ${screenSplitted ? `hero-splitted` : null}`}>
          <Animation isBlurred={animationIsBlurred} />
          <TitleBlock isVisible={titleIsVisible} isSmall={screenSplitted} onLinkClick={handleLinkClick} links={links} activeLink={activeLink ?? ""} />

          {/* <div className="theme-switcher">
            <div className={`theme-item ${theme === 'dark' && 'theme-itemSelected'}`} onClick={() => { setTheme('dark') }}>dark</div>
            <div className={`theme-item ${theme === 'auto' && 'theme-itemSelected'}`} onClick={() => { setTheme('auto') }}>auto</div>
            <div className={`theme-item ${theme === 'light' && 'theme-itemSelected'}`} onClick={() => { setTheme('light') }}>light</div>
          </div> */}
        </div>
        <div className={`content ${screenSplitted ? `content-opened` : null}`}>
          {activeLink === "About" ? (
            <About />
          ) : activeLink === "Projects" ? (
            <p>Projects content</p>
          ) : activeLink === "Contact" ? (
            <p>Contact content</p>
          ) : null}
        </div>

      </div>
    </main>
  )
}
