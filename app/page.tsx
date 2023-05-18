'use client'
import { Animation } from "@/components/Animation/Animation"
import { useEffect, useState, useRef } from "react"
import "./Home.css"

export default function Home() {

  const [arrowVisible, setArrowVisible] = useState(false)

  const myRef = useRef<HTMLDivElement>(null)
  const executeScroll = () => myRef.current?.scrollIntoView({ behavior: 'smooth' })


  useEffect(
    () => {
      const timeOut = setTimeout(() => {
        setArrowVisible(true)
      }, 3000);
    }, []
  )

  return (
    <main>
      <div className="screen-one">
        <Animation />
        <div className="down-icon"> <img onClick={executeScroll} className="scroll-icon" src="/images/down.svg" alt="scroll down icon" width={arrowVisible ? "20px" : "0px"} height={arrowVisible ? "20px" : "0px"} /></div>
      </div>
      <div className="screen-two" ref={myRef}>

      </div>
    </main>
  )
}
