import Spinner from '../Spinner/Spinner'
import './SendEmailIcon.css'

interface SendEmailIconProps {
  state: 'initial' | 'loading' | 'sent' | 'error'
}

export default function SendEmailIcon({ state }: SendEmailIconProps) {
  if (state === 'initial') {
    return (
      <img
        className='send-icon'
        src='images/send-icon.svg'
        alt='download-cv-icon'
      />
    )
  } else if (state === 'loading') {
    return (
      <div className='send-icon'>
        <Spinner />
      </div>
    )
  } else if (state === 'sent') {
    return null
  } else {
    return null
  }
}
