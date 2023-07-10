import './TitleBlock.css'

interface AnimatdTitleProps {
    isVisible: boolean
    isSmall: boolean
    onLinkClick: (clickedLink: String) => void
    links: String[]
    activeLink: String
}

export function TitleBlock({ isVisible, isSmall, onLinkClick, links, activeLink }: AnimatdTitleProps) {

    const handleClick = (clickedLink: String) => {
        onLinkClick(clickedLink);
    };

    const IsLinkActive = (link: String) => {
        return link === activeLink
    }

    return (
        <div className='title-blockWrapper'>
        <div className={`title-block ${isVisible && ` title-blockVisible`}`}>
            <h1 className="title">
                Hello ! My name is Simon Ferlat
            </h1>
            <div className="links">
                {
                    links.map((link, index) => {
                        return (
                            <span
                                key={index}
                                className={`link ${IsLinkActive(link) && "link-active"}`}
                                onClick={() => handleClick(link)}>
                                {link}
                            </span>
                        )
                    }
                    )
                }
            </div>
        </div>

        </div>
    )

}
