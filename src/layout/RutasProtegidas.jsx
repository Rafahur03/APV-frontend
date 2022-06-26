import {Outlet, Navigate} from 'react-router-dom'
import Header from '../componens/Header'
import Footer from '../componens/Footer'
import { useAuth } from '../context/AuthProvider'

const RutasProtegidas = () => {
  const { auth, cargando } = useAuth()
  if(cargando) return 'cargando..'
  return (
    <>
      <Header />
        {auth?._id ?(
          <main className="container mx-auto mt-12">
            <Outlet/>
          </main>
        ): <Navigate to = "/" />}
      <Footer/>

    </>
  )
}

export default RutasProtegidas