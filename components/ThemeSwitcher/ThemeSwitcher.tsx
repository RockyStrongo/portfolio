import { Dispatch, SetStateAction } from 'react'
import './ThemeSwitcher.css'

type ThemeSwitcherProps = {
  isVisible: boolean
  currentTheme: string
  setTheme: Dispatch<SetStateAction<'dark' | 'auto' | 'light'>>
}

export default function ThemeSwitcher({
  isVisible,
  currentTheme,
  setTheme,
}: ThemeSwitcherProps) {
  return (
    <div className={`theme-switcher ${isVisible && 'theme-switcherVisible'}`}>
      <button
        className={`theme-item ${
          currentTheme === 'dark' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('dark')
        }}
      >
        dark
      </button>
      <button
        className={`theme-item ${
          currentTheme === 'auto' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('auto')
        }}
      >
        auto
      </button>
      <button
        className={`theme-item ${
          currentTheme === 'light' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('light')
        }}
      >
        light
      </button>
    </div>
  )
}
