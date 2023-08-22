import './ContentAppearsAnimation.css'
import { ReactNode, useEffect, useState } from 'react'

interface ContentAppearsAnimationProps {
    firstClick: boolean,
    children: ReactNode
}

export function ContentAppearsAnimation({ firstClick, children }: ContentAppearsAnimationProps) {

    const [contentIsVisible, setContentIsVisible] = useState(false)

    useEffect(
        () => {
            firstClick ? setTimeout(() => {
                setContentIsVisible(true)
            }, 400) : setContentIsVisible(true);
        }, [firstClick]
    )

    return (
        <div className={`initial ${contentIsVisible && `visible`}`}>
            {children}
        </div>
    )

}