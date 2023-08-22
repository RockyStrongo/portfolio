import { ContentAppearsAnimation } from "../ContentAppearsAnimation/ContentAppearsAnimation"

interface ProjectsProps {
    firstClick: boolean
}

export function Projects({ firstClick }: ProjectsProps) {

    return (
        <ContentAppearsAnimation firstClick={firstClick}>
            <p>projects</p>
        </ContentAppearsAnimation>
    )


}