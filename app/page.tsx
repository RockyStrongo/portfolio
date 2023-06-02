'use client'
import { Animation } from "@/components/Animation/Animation"
import { TitleBlock } from "@/components/TitleBlock/TitleBlock"
import { useEffect, useState, useRef } from "react"
import "./Home.css"

export default function Home() {

  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(false)
  const [screenSplitted, setScreenSplitted] = useState<boolean>(false)
  const [animationIsBlurred, setAnimationBlurred] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<String>()

  useEffect(
    () => {
      const timeOut = setTimeout(() => {
        setTitleIsVisible(true);
        setAnimationBlurred(true)
      }, 2000);

    }, []
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
        </div>
       <div className={`content ${screenSplitted ? `content-opened` : null }`}>
          {activeLink === "About" ? (
            <p>About content</p>
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
