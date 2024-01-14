import { Dispatch, SetStateAction } from "react"
import './ThemeSwitcher.css'

type ThemeSwitcherProps = {
  titleIsVisible: boolean
  currentTheme: string
  setTheme: Dispatch<SetStateAction<"dark" | "auto" | "light">>
}

export default function ThemeSwitcher({
  titleIsVisible,
  currentTheme,
  setTheme,
}: ThemeSwitcherProps) {
  return (
    <div
      className={`theme-switcher ${titleIsVisible && 'theme-switcherVisible'}`}
    >
      <div
        className={`theme-item ${
          currentTheme === 'dark' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('dark')
        }}
      >
        dark
      </div>
      <div
        className={`theme-item ${
          currentTheme === 'auto' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('auto')
        }}
      >
        auto
      </div>
      <div
        className={`theme-item ${
          currentTheme === 'light' && 'theme-itemSelected'
        }`}
        onClick={() => {
          setTheme('light')
        }}
      >
        light
      </div>
    </div>
  )
}
