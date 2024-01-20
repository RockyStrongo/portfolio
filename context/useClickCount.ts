import { useContext } from 'react'
import { clickCountContext } from './clickCountContext'

export const useClickCount = () => {
  const { clickCount, setClickCount } = useContext(clickCountContext)

  return { clickCount, setClickCount }
}
