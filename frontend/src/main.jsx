import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import AnswerProvider from './context/ResponseContext.jsx'
import UserProvider from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <UserProvider>
   <AnswerProvider> 
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
     </AnswerProvider> 
      </UserProvider>
  </>
)
