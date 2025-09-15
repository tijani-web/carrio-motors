import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/about', element: <AboutPage /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
