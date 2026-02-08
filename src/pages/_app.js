// import '../styles/globals.css'
// import { useEffect, useState } from 'react'

// function MyApp({ Component, pageProps }) {
//   const [darkMode, setDarkMode] = useState(false)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedTheme = localStorage.getItem('theme')
//       if (savedTheme === 'dark') {
//         setDarkMode(true)
//       } else if (savedTheme === 'light') {
//         setDarkMode(false)
//       } else {
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
//         setDarkMode(prefersDark)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [darkMode])

//   return (
//     <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'bg-dark-gradient' : 'bg-light-gradient'}`}>
//       <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
//     </div>
//   )
// }

// export default MyApp



// _app.js
import '../styles/globals.css'
import { ThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp