import { useEffect, useState } from 'react'
import './About.css'
import Image from 'next/image'

export function About() {

    const [textIsVisible, setTextIsVisible] = useState(false)
    const [iconsAreVisible, setIconsAreVisible] = useState(false)
    const [cvSubtextIsVisible, setCvSubtextIsVisible] = useState(false)

    useEffect(
        () => {
            setTextIsVisible(true);
            setIconsAreVisible(true);
        }, []
    )

    return (
        <div className={`about ${textIsVisible ? `about-visible` : null}`}>
            <div className='about-content'>
                <p>I am a passionate web developper. </p>
                <p>I live in <a target='_blank' className='link link-active' href="https://www.google.com/search?q=Aix-en-Provence">Aix-en-Provence</a>, in the south of France.</p>
                <p>I currently work for <a target='_blank' href='https://citech.fr/' className='link link-active'>Citech</a>.</p>
                <p>I specialize in front-end development, specifically with Next.js, React, and Tailwind.</p>
                <div className={`about-icons ${iconsAreVisible ? "about-iconsVisible" : null}`}>
                    <Image className='about-icon' src="images/linkedin.svg" alt="linkedin-icon" width="30" height="30" />
                    <Image className='about-icon' src="images/github.svg" alt="github-icon" width="30" height="30" />
                        <Image className='about-icon'
                            src="images/circle-down-solid.svg"
                            alt="download-cv-icon"
                            width="30"
                            height="30"
                        />
                </div>

            </div>
        </div>
    )
}