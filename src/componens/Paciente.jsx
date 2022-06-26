import {usePacientes} from '../context/PacientesProvaider'

const Paciente = ({ paciente }) => {
   const { setEdicion, eliminarPaciente } = usePacientes() 
   const {nombre, propietario, email, fechaEgreso, sintomas, _id} = paciente
   const formatearfecha = fecha =>{
   const nuevafecha = new Date(fecha)
   
    return new Intl.DateTimeFormat('es-ES', {dateStyle:'long'}).format(nuevafecha)
   }



  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className=" font-bold uppercase text-indigo-800 my-2 ">
            Nombre : 
            <span className="font-normal normal-case text-black"> {nombre}</span>
        </p>
        <p className=" font-bold uppercase text-indigo-800 my-2  ">
             Propietario : 
            <span className="font-normal normal-case text-black"> {propietario}</span>
        </p>    
        <p className=" font-bold uppercase text-indigo-800 my-2  ">
            Email de contacto : 
            <span className="font-normal normal-case text-black"> {email}</span>
        </p>
        <p className=" font-bold uppercase text-indigo-800 my-2  ">
            Fecha De Egreso : 
            <span className="font-normal normal-case text-black"> {formatearfecha(fechaEgreso)}</span>
        </p>
        <p className=" font-bold uppercase text-indigo-800 my-2  ">
            Sintomas : 
            <span className="font-normal normal-case text-black"> {sintomas}</span>
        </p>
        <div className=" flex justify-between my-5 m">
            <button
                type="button"
                className="py-3 px-10 font-bold text-white uppercase bg-indigo-600 hover:bg-indigo-800 rounded-lg"
                onClick={() => setEdicion(paciente)}
           >
                Editar paciente
            </button>
            <button
                type="button"
                className="py-3 px-10 font-bold text-white uppercase bg-red-600 hover:bg-red-800 rounded-lg"            
                onClick={() => eliminarPaciente(_id)}
            >
                Eliminar paciente
            </button>
        </div>
    </div>
  )
}

export default Paciente