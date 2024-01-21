import './TitleBlock.css'

interface AnimatdTitleProps {
  isVisible: boolean
  isSmall: boolean
  onLinkClick: (clickedLink: String) => void
  links: String[]
  activeLink: String | null
}

export function TitleBlock({
  isVisible,
  isSmall,
  onLinkClick,
  links,
  activeLink,
}: AnimatdTitleProps) {
  const handleClick = (clickedLink: String) => {
    onLinkClick(clickedLink)
  }

  const IsLinkActive = (link: String) => {
    return link === activeLink
  }

  return (
    <div className='title-blockWrapper'>
      <div className={`title-block ${isVisible && ` title-blockVisible`}`}>
        <h1 className='title'>Hello ! My name is Simon Ferlat</h1>
        <div className='links'>
          {links.map((link, index) => {
            return (
              <button
                key={index}
                className={`link title-block-link ${IsLinkActive(link) && 'link-active'}`}
                onClick={() => handleClick(link)}
              >
                {link}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
