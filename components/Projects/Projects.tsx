import { useClickCount } from '@/context/useClickCount'
import { ContentAppearsAnimation } from '../ContentAppearsAnimation/ContentAppearsAnimation'
import './Projects.css'

export function Projects() {
  const { clickCount } = useClickCount()

  return (
    <ContentAppearsAnimation firstClick={clickCount === 1}>
      <div className='projects'>
        <h2 className='projects-title'>Articles</h2>
        <div className='project-list'>
          <div className='project-card'>
            <a
              href='https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd?source=friends_link&sk=1126b07e92e4613e4d87c5ad38efe983'
              target='_blank'
              className='project-card-title'
            >
              Infinite Scroll with Next.js Server Actions: A Simple Guide
            </a>
            <p className='project-card-description'>
              Tutorial about how to emplement infinite scroll with NextJS
            </p>
          </div>
          <div className='project-card'>
            <a
              href='https://medium.com/@ferlat.simon/internationalize-your-next-js-static-site-with-app-router-772f9f16e63?source=friends_link&sk=b52faf51e63e923aa7b78ec8b862e7e2'
              target='_blank'
              className='project-card-title'
            >
              Internationalize Your Next.js Static Site (with App Router)
            </a>
            <p className='project-card-description'>
              Tutorial about how to apply translations to a NextJS static site
            </p>
          </div>
        </div>

        <h2 className='projects-title'>Projects</h2>
        <div className='project-card'>
          <a
            href='https://leaflover-front.simonferlat.com/'
            target='_blank'
            className='project-card-title'
          >
            LeafLover
          </a>
          <div className='project-card-description'>
            Web app to get information about plants (public) and watering
            reminders (connected).
            <ul>
              <li>Front : Nuxt, VueJS, Tailwind CSS</li>
              <li>Back : NodeJS, Express, Prisma, PostgreSQL</li>
              <li>HTTP Only JWT authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </ContentAppearsAnimation>
  )
}
