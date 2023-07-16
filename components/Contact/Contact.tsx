import React from 'react'
import './Contact.css'
import AnimatedInput from '../AnimatedInput/AnimatedInput'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import SendEmailIcon from '../SendEmailIcon/SendEmailIcon'
import axios, { AxiosResponse } from 'axios'

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
    const [emailState, setEmailState] = useState<"initial" | "loading" | "sent" | "error">("initial")
    const [emailFormData, setEmailFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [message, setMessage] = useState<string>("")

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(emailFormData)


        try {
            setEmailState("loading")
            const res = await axios.post('/api/contact', emailFormData)
            setEmailState("sent")
            setMessage("Email envoyé avec succès")

        } catch (error: any) {
            setEmailState("error")
            setMessage(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { id, value } = e.target;
        setEmailFormData({
            ...emailFormData,
            [id]: value
        })
    }

    return <form className={`contact-form ${formIsVisible && `contact-form-visible`}`} onSubmit={sendEmail}>
        {emailState != "sent" ? <div className='contact-form-inputs'>
            <AnimatedInput type="text" placeholderLabel='Name' id="name" value={emailFormData.name} onChange={handleChange} />
            <AnimatedInput type="email" placeholderLabel='Email' id="email" value={emailFormData.email} onChange={handleChange} />
            <AnimatedInput type="textarea" placeholderLabel='Message' id="message" value={emailFormData.message} onChange={handleChange} />
        </div> : <div>
            {message}
            <div>send a new email</div>
        </div>}
        {emailState != "sent" && <button className='send-button' type='submit'>
            <SendEmailIcon state={emailState} />
        </button>}
    </form>
}