import { createContext } from 'react'

type ClickCountContextType = {
  clickCount: number
  setClickCount: (count: number) => void
}

const defaultClickCountContext: ClickCountContextType = {
  clickCount: 0,
  setClickCount: () => {},
}

export const clickCountContext = createContext(defaultClickCountContext)
