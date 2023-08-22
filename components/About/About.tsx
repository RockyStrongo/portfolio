import { useEffect, useState } from 'react'
import Link from 'next/link'
import './About.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface AboutProps {
    firstClick: boolean
}

export function About({ firstClick }: AboutProps) {

    const [textIsVisible, setTextIsVisible] = useState(false)

    useEffect(
        () => {
            firstClick ? setTimeout(() => {
                setTextIsVisible(true)
            }, 250) : setTextIsVisible(true);
        }, [firstClick]
    )

    const goTo = (url: string) => {
        return () => {
            window.open(url, '_blank');
        }
    }

    return (
        <div className={`about ${textIsVisible && `about-visible`}`}>
            <div className='about-content'>
                <p>I build web applications. I currently work at <a target='_blank' href='https://citech.fr/' className='link link-active'>Citech</a>. </p>
                <p>My main expertise is front-end development, particularly with React, Next.js, and Tailwind CSS.</p>
                <p>I live in <a target='_blank' className='link link-active' href="https://www.google.com/search?q=Aix-en-Provence">Aix-en-Provence</a>, in the south of France.</p>
                <p>In my free time, I enjoy oil painting. You can find some of my artwork <Link target='_blank' className='link link-active' href="https://www.instagram.com/outofcontextsimsim/">here</Link> !</p>
                <div className="about-icons">
                    <Image
                        className='about-icon'
                        src="images/linkedin.svg"
                        alt="linkedin-icon"
                        width="30" height="30"
                        onClick={goTo("https://www.linkedin.com/in/simon-ferlat-34511980/")} />
                    <Image
                        className='about-icon'
                        src="images/github.svg"
                        alt="github-icon"
                        width="30" height="30"
                        onClick={goTo("https://github.com/RockyStrongo")} />
                    <Image className='about-icon'
                        src="images/circle-down-solid.svg"
                        alt="download-cv-icon"
                        width="30"
                        height="30"
                        onClick={goTo("/cv/cv.pdf") }
                    />
                </div>

            </div>
        </div>
    )
}