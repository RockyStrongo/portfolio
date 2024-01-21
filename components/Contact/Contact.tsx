import React from 'react'
import './Contact.css'
import AnimatedInput from '../AnimatedInput/AnimatedInput'
import { useState, useEffect } from 'react'
import SendEmailIcon from '../SendEmailIcon/SendEmailIcon'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { ContentAppearsAnimation } from '../ContentAppearsAnimation/ContentAppearsAnimation'
import { useClickCount } from '@/context/useClickCount'

export function Contact() {
  const { clickCount } = useClickCount()

  const [emailState, setEmailState] = useState<
    'initial' | 'loading' | 'sent' | 'error'
  >('initial')
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    lastName: '', // Honey pot
    email: '',
    message: '',
  })
  const [message, setMessage] = useState<string>('')

  const sendEmail = async () => {
    try {
      setEmailState('loading')
      const res = await axios.post('/api/contact', emailFormData)
      setEmailState('sent')
      setMessage('✓ Email sent !')
    } catch (error: any) {
      setEmailState('error')
      setMessage('API Error, please try again later')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target
    const sanitizedValue = DOMPurify.sanitize(value)
    setEmailFormData({
      ...emailFormData,
      [id]: sanitizedValue,
    })
  }

  const resetForm = () => {
    setEmailFormData({
      name: '',
      lastName: '',
      email: '',
      message: '',
    })
    setEmailState('initial')
    setMessage('')
  }

  const validateForm = () => {
    if (
      emailFormData.name === '' ||
      emailFormData.email === '' ||
      emailFormData.message === ''
    ) {
      setMessage('All fields must be filled')
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

  return (
    <form className='contact-form-container' onSubmit={handleSubmit}>
      <ContentAppearsAnimation firstClick={clickCount === 1}>
        <div className='contact-form'>
          {emailState != 'sent' && emailState != 'error' && (
            <div className='contact-form-inputs'>
              <AnimatedInput
                type='text'
                placeholderLabel='Name'
                id='name'
                value={emailFormData.name}
                onChange={handleChange}
              />
              {/* Honey pot*/}
              <label className='gxxghqibhy' htmlFor='lastName'></label>
              <input
                className='gxxghqibhy'
                autoComplete='off'
                type='text'
                id='lastName'
                name='lastName'
                onChange={handleChange}
                placeholder='Last name'
              />
              <AnimatedInput
                type='email'
                placeholderLabel='Email'
                id='email'
                value={emailFormData.email}
                onChange={handleChange}
              />
              <AnimatedInput
                type='textarea'
                placeholderLabel='Message'
                id='message'
                value={emailFormData.message}
                onChange={handleChange}
              />

              <button className='send-button' type='submit'>
                <SendEmailIcon state={emailState} />
              </button>
            </div>
          )}
          {message && (
            <div className='message-wrapper'>
              <div
                className={`message-snack ${
                  emailState === 'sent' && 'message-snack-success'
                }`}
              >
                {message}
              </div>
              {emailState === 'sent' && (
                <button className='new-email-link' onClick={resetForm}>
                  ↻ Send another new email
                </button>
              )}
            </div>
          )}
        </div>
      </ContentAppearsAnimation>
    </form>
  )
}
