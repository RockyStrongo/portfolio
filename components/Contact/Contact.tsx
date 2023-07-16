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

    const sendEmail = async () => {
        try {
            setEmailState("loading")
            const res = await axios.post('/api/contact', emailFormData)
            setEmailState("sent")
            setMessage("✓ Email sent !")

        } catch (error: any) {
            setEmailState("error")
            setMessage("API Error, please try again later")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { id, value } = e.target;
        setEmailFormData({
            ...emailFormData,
            [id]: value
        })
    }

    const resetForm = () => {
        setEmailFormData({
            name: "",
            email: "",
            message: ""
        })
        setFormIsVisible(true)
        setEmailState("initial")
        setMessage("")
    }

    const validateForm = () => {
        if (emailFormData.name === "" || emailFormData.email === "" || emailFormData.message === "") {
            setMessage("All fields must be filled")
            return false
        }
        return true
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formIsValid = validateForm()

        if (formIsValid) {
            sendEmail()
        }

    }

    return (<form className={`contact-form ${formIsVisible && `contact-form-visible`}`} onSubmit={handleSubmit}>
        {emailState != "sent" && emailState != "error" && <div className='contact-form-inputs'>
            <AnimatedInput type="text" placeholderLabel='Name' id="name" value={emailFormData.name} onChange={handleChange} />
            <AnimatedInput type="email" placeholderLabel='Email' id="email" value={emailFormData.email} onChange={handleChange} />
            <AnimatedInput type="textarea" placeholderLabel='Message' id="message" value={emailFormData.message} onChange={handleChange} />
            <button className='send-button' type='submit'>
                <SendEmailIcon state={emailState} />
            </button>
        </div>}
        {message && <div className='message-wrapper'>
            <div className={`message-snack ${emailState === 'sent' && 'message-snack-success'}`}>{message}</div>
            {emailState === "sent" && <div className='new-email-link' onClick={resetForm}>↻ Send another new email</div>}
        </div>}
    </form>)
}