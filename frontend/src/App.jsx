
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {AuthProvide} from './context/AuthContext'



function App() {

  return (
    <>
      <AuthProvide>
        <div className='bg-gray-100'>
        <NavBar />
        <main className='min-h-screen px-4 py-6 mx-20  max-w-screen-2xl scroll-smooth'>
          <Outlet/>
        </main>
        <Footer/>
        </div >
      </AuthProvide> 
    </>
  )
}

export default App
