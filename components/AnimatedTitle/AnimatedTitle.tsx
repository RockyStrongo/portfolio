import './AnimatedTitle.css'

type AnimatdTitleProps = {
    isUnderlined: boolean
    isVisible?: boolean
}

export function AnimatedTitle({ isUnderlined, isVisible }: AnimatdTitleProps) {

    return (
        <>
            <h1 className={isVisible ? `title title-visible` : `title `}>Hello !
                <div className="title-secondLine" >My name is <span className={isUnderlined ? `underline--magical underline--magical-full` : `underline--magical`}>Simon Ferlat</span>
                </div>
            </h1>
        </>
    )

}
