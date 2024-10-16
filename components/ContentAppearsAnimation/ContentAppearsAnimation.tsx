import './ContentAppearsAnimation.css'
import { ReactNode, useEffect, useState } from 'react'

interface ContentAppearsAnimationProps {
  firstClick: boolean
  children: ReactNode
}

export function ContentAppearsAnimation({
  firstClick,
  children,
}: ContentAppearsAnimationProps) {
  const FIRST_CLICK_DURATION = 400

  const [contentIsVisible, setContentIsVisible] = useState(false)

  useEffect(() => {

    if (firstClick) {
      const timeout = setTimeout(() => {
        setContentIsVisible(true)
      }, FIRST_CLICK_DURATION)

      return () => {
        clearTimeout(timeout);
      };
    }

    setContentIsVisible(true)
  }, [firstClick])

  return (
    <div className={`initial ${contentIsVisible && `visible`}`}>{children}</div>
  )
}
