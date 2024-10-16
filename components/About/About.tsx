import { useEffect, useState } from 'react'
import Link from 'next/link'
import './About.css'
import Image from 'next/image'
import { ContentAppearsAnimation } from '../ContentAppearsAnimation/ContentAppearsAnimation'
import { useClickCount } from '@/context/useClickCount'

export function About() {
  const goTo = (url: string) => {
    return () => {
      window.open(url, '_blank')
    }
  }

  const { clickCount } = useClickCount()

  return (
    <ContentAppearsAnimation firstClick={clickCount === 1}>
      <div className='about'>
        <div className='about-content'>
          <p>
            I am a software developper. I currently work at
            <a
              target='_blank'
              href='https://www.airbus.com/en'
              className='link link-underlined'
            >
              Airbus Helicopters.
            </a>
          </p>
          <p>My main expertise is :</p>
          <ul>
            <li>Back-end development : NodeJS, NestJS, Prisma, PostgreSQL.</li>
            <li>Front-end development : React, Next.js, Tailwind CSS.</li>
          </ul>
          <p>
            I live in
            <a
              target='_blank'
              className='link link-underlined'
              href='https://www.google.com/search?q=Aix-en-Provence'
            >
              Aix-en-Provence
            </a>
            , in the south of France.
          </p>
          <p>
            In my free time, I enjoy oil painting. You can find some of my
            artwork
            <Link
              target='_blank'
              className='link link-underlined'
              href='https://www.instagram.com/outofcontextsimsim/'
            >
              here
            </Link>
          </p>
          <div className='about-icons'>
            <Image
              className='about-icon'
              src='images/linkedin.svg'
              alt='linkedin-icon'
              width='30'
              height='30'
              onClick={goTo(
                'https://www.linkedin.com/in/simon-ferlat-34511980/'
              )}
            />
            <Image
              className='about-icon'
              src='images/github.svg'
              alt='github-icon'
              width='30'
              height='30'
              onClick={goTo('https://github.com/RockyStrongo')}
            />
            <Image
              className='about-icon'
              src='images/circle-down-solid.svg'
              alt='download-cv-icon'
              width='30'
              height='30'
              onClick={goTo('/cv/cv.pdf')}
            />
          </div>
        </div>
      </div>
    </ContentAppearsAnimation>
  )
}
