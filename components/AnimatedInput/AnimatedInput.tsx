import './AnimatedInput.css'

interface AnimatedInputProps {
    id: string,
    placeholderLabel: string,
    type: "text" | "email" | "textarea",
}

export default function AnimatedInput({ id, placeholderLabel, type }: AnimatedInputProps) {

    const placeholderGoesUp = (elementId: string) => {
        const label = document.getElementById(elementId)
        label?.classList.add("focused")
    }

    const placeholderGoesDown = (elementId: string) => {

        const label = document.getElementById(elementId)
        label?.classList.remove("focused")
    }

    const onInputFocus = (e: React.FocusEvent) => {
        placeholderGoesUp(e.target.id + "Label")
    }

    const OnInputBlur = (e: React.FocusEvent) => {
        const inputValue = (e.target as HTMLInputElement).value
        !inputValue && placeholderGoesDown(e.target.id + "Label")
    }

    const OnInputChange = (e: React.ChangeEvent) => {
        const inputValue = (e.target as HTMLInputElement).value
        inputValue && placeholderGoesUp(e.target.id + "Label")
    }


    return (

        <div className='input-group'>
            <label
                className={`input-label ${type === "textarea" && "input-label-textarea"}`}
                id={`${id}Label`}
                htmlFor={id}>
                {placeholderLabel}
            </label>
            {type === "text" || type === "email" ? <input
                className='input'
                type={type}
                id={id}
                onFocus={onInputFocus}
                onBlur={OnInputBlur}
                onChange={OnInputChange} /> : <textarea
                className='input'
                id={id}
                onFocus={onInputFocus}
                onBlur={OnInputBlur} />}
        </div>

    )
}