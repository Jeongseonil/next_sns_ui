import './globals.css'
import MenuBar from './MenuBar'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <MenuBar/>
      </body>
    </html>
  )
}
