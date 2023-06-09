import React from 'react'
import './Contact.css'
import AnimatedInput from '../AnimatedInput/AnimatedInput'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'

interface ContactProps {
    firstClick: boolean
}

export default function Contact({ firstClick }: ContactProps) {

    useEffect(
        () => {
            firstClick ? setTimeout(() => {
                setFormIsVisible(true)
            }, 750) : setFormIsVisible(true)
        }, [firstClick]
    )

    const [formIsVisible, setFormIsVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    return <form className={`contact-form ${formIsVisible && `contact-form-visible`}`} onSubmit={sendEmail}>
        <AnimatedInput type="text" placeholderLabel='Name' id="name" />
        <AnimatedInput type="email" placeholderLabel='Email' id="email" />
        <AnimatedInput type="textarea" placeholderLabel='Message' id="message" />
        <button className='send-button' type='submit'>
            {loading ? <div className='send-icon'><Spinner /></div> : <img
                className='send-icon'
                src="images/send-icon.svg"
                alt="download-cv-icon"
            />}
        </button>
    </form>
}