'use client'
import React, { Children, useState } from 'react'
import { clickCountContext } from './clickCountContext'

type ClickCountContextProviderProps = {
  children: React.ReactNode
}

export default function ClickCountContextProvider({
  children,
}: ClickCountContextProviderProps) {
  const [clickCount, setClickCount] = useState(0)

  return (
    <clickCountContext.Provider value={{ clickCount, setClickCount }}>
      {children}
    </clickCountContext.Provider>
  )
}
