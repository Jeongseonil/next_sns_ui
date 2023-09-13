import './globals.css'
import MenuBar from './MenuBar'
import Cookies from 'js-cookie';

export default function RootLayout({ children }) {
  let bar = null;
  if(Cookies.get("userNo")){
    bar = <MenuBar/>
  }
  return (
    <html>
      <body>
        {children}
        {bar}
      </body>
    </html>
  )
}
