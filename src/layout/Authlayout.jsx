import {Outlet} from 'react-router-dom' // carga los componentes de loguin
const Authlayout = () => {
  return (
    <>
        <h1 className="text-center text-2xl font-bold text-white uppercase bg-indigo-600">
          Administrador de pacientes de veterinaria
        </h1>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-6 md:mt-15 gap-14 p-5 items-center">
          <Outlet />.
        </main>

    </>
  )
} 

export default Authlayout