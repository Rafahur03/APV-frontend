import { useState } from 'react'
import Formulario from "../componens/Formulario"
import ListadoPacientes from "../componens/ListadoPacientes"

const AdministrarPacientes = () => {
  const[mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <div className="flex flex-col md:flex-row lg:flex-row text">
      <button
        type="button"
        className=" bg-indigo-600 font-bold text-white uppercase rounded-md mx-10 p-3 hover:bg-indigo-900 md:hidden"
        onClick={()=>setMostrarFormulario(!mostrarFormulario) }
      >{`${mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario' }`}</button>
      <div className= {`${mostrarFormulario ? 'block' : 'hidden' } md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario/>  
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes/>
      </div>
    </div>
  )
}

export default AdministrarPacientes