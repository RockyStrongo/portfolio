import ClickCountContextProvider from '@/context/clickCountContextProvider'
import './Layout.css'

export const metadata = {
  title: 'Simon Ferlat',
  description: 'Portfolio of Simon Ferlat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ClickCountContextProvider>
        <body>{children}</body>
      </ClickCountContextProvider>
    </html>
  )
}
