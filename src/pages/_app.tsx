import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {AppProvider} from '../data/context/AppContext'
import {AuthProvider} from '../data/context/AuthContext'

function App({ Component, pageProps }) {
  return( 
  <AuthProvider>
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </AuthProvider>
)}

export default App;