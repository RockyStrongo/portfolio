'use client'
import { Animation } from "@/components/Animation/Animation"
import { TitleBlock } from "@/components/TitleBlock/TitleBlock"
import { About } from "@/components/About/About"
import { useEffect, useState, useRef } from "react"
import "./Home.css"
import Contact from "@/components/Contact/Contact"

export default function Home() {

  const [loading, setLoading] = useState<boolean>(true)
  const [linkClickCount, setLinkClickCount] = useState<number>(0)
  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(false)
  const [screenSplitted, setScreenSplitted] = useState<boolean>(false)
  const [animationIsBlurred, setAnimationBlurred] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<String>()
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto')


  useEffect(
    () => {
      const root = document.documentElement;
      //dynamically setting the page height to avoid bugs with 100vh in mobile
      root.style.setProperty('--doc-height', `${window.innerHeight}px`)
      setLoading(false)

      const timeOut = setTimeout(() => {
        setTitleIsVisible(true);
        setAnimationBlurred(true)
      }, 2000);

    }, []
  )

  useEffect(
    () => {
      const rootElement = document.documentElement;
      //manage theme changes
      function setToDark() {
        rootElement.style.setProperty('--hero-bg-color', '#18202c');
        rootElement.style.setProperty('--content-bg-color', 'linear-gradient(147deg, #000000 0%, #2c3e50 74%)');
        rootElement.style.setProperty('--font-color', 'rgb(248, 250, 252)');
        rootElement.style.setProperty('--content-font-color', 'rgb(248, 250, 252)');
        rootElement.style.setProperty('--input-bg-color', '#3c4f63');
      }

      function setToLight() {
        rootElement.style.setProperty('--hero-bg-color', 'rgb(248, 250, 252)');
        rootElement.style.setProperty('--content-bg-color', 'linear-gradient(to bottom, #7aa2df 0%, #9fb5d6 90%)');
        rootElement.style.setProperty('--font-color', 'darkslategray');
        rootElement.style.setProperty('--content-font-color', 'black');
        rootElement.style.setProperty('--input-bg-color', 'rgb(247, 240, 240)');
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
    setLinkClickCount(linkClickCount + 1)
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
      {!loading ? <div className="screen">
        <div className={`hero ${screenSplitted && `hero-splitted`}`}>
          <Animation isBlurred={animationIsBlurred} />
          <TitleBlock isVisible={titleIsVisible} isSmall={screenSplitted} onLinkClick={handleLinkClick} links={links} activeLink={activeLink ?? ""} />
          <div className={`theme-switcher ${titleIsVisible && 'theme-switcherVisible'}`}>
            <div className={`theme-item ${theme === 'dark' && 'theme-itemSelected'}`} onClick={() => { setTheme('dark') }}>dark</div>
            <div className={`theme-item ${theme === 'auto' && 'theme-itemSelected'}`} onClick={() => { setTheme('auto') }}>auto</div>
            <div className={`theme-item ${theme === 'light' && 'theme-itemSelected'}`} onClick={() => { setTheme('light') }}>light</div>
          </div>
        </div>

        <div className={`content ${screenSplitted && `content-opened`}`}>
          {activeLink === "About" ? (
            <About firstClick={linkClickCount == 1 ? true : false} />
          ) : activeLink === "Projects" ? (
            <p>Projects content</p>
          ) : activeLink === "Contact" ? (
            <Contact/>
          ) : null}
        </div>

      </div> : <div className="loading" />}
    </main>
  )
}
