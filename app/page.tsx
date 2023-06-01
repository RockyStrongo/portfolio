'use client'
import { Animation } from "@/components/Animation/Animation"
import { AnimatedTitle } from "@/components/AnimatedTitle/AnimatedTitle"
import { useEffect, useState, useRef } from "react"
import "./Home.css"

export default function Home() {

  const [arrowVisible, setArrowVisible] = useState(false)
  const [screenTwoChangesColor, setScreenTwoChangesColor] = useState(false)
  const [titleIsUnderlined, setTitleIsUnderlined] = useState(false)
  const [titleIsVisible, setTitleIsVisible] = useState(false)
  const [linkIsUnderlined, setLinkIsUnderlined] = useState(false)

  const targetDivRef = useRef<HTMLDivElement>(null)
  const executeScroll = () => {

    targetDivRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(
    () => {

      //show the arrow for scroll after 1 seconds
      const timeOut = setTimeout(() => {
        setArrowVisible(true)
      }, 1000);

      //when scrolling to page 2, launch the title underline animation
      window.addEventListener('scroll', handleScrollToPage2);

      return () => {
        window.removeEventListener('scroll', handleScrollToPage2);
      };
    }, []
  )

  const handleScrollToPage2 = () => {
    const targetDiv = targetDivRef.current;
    if (!targetDiv) return

    const rect = targetDiv.getBoundingClientRect();
    if (!rect) return;

    const { top } = rect;
    const isDivVisible = top >= 0 && top <= window.innerHeight;

    if (isDivVisible) {

      setScreenTwoChangesColor(true)

      setTitleIsVisible(true);

      const timeOut2 = setTimeout(() => {
        setTitleIsUnderlined(true);
      }, 3000);
    }
  };

  return (
    <main>
      {/* first page  */}
      <div className="screen-one">
        <Animation />
        <div className="down-icon"> <img onClick={executeScroll} className="scroll-icon" src="/images/down.svg" alt="scroll down icon" width={arrowVisible ? "20px" : "0px"} height={arrowVisible ? "20px" : "0px"} /></div>
      </div>

      {/* second page  */}
      <div className="screen-two" ref={targetDivRef}>
        {/* transition on background are not working with gradient, so I have to use transition on opacity of a layer   */}
        <div className={`screen-twoGradientLayer ${screenTwoChangesColor ? ` screen-twoGradientLayerVisible` : null}`}>
          <AnimatedTitle isVisible={titleIsVisible} isUnderlined={titleIsUnderlined}></AnimatedTitle>
          <div className="links">
            <span className={`link`}>About</span>
            <span className={`link`}>Projects</span>
            <span className={`link`}>Contact</span>
          </div>

        </div>
        {/* <button onClick={() => { setScreenTwoChangesColor(true) }}>test</button> */}
      </div>

    </main>
  )
}
