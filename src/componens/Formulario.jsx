import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import { usePacientes} from '../context/PacientesProvaider'

const Formulario = () => {

    const [ nombre, setNombre ] = useState('')
    const [ propietario, setPropietario ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ fechaEgreso, setFechaEgreso ] = useState('')
    const [ sintomas, setSintomas] = useState('')
    const [ id, setId ] = useState('')
    const [ alerta, SetAlerta]  = useState({})
    const { guardarPacientes, paciente } = usePacientes()
    
    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFechaEgreso(paciente.fechaEgreso)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])


    const handleSubmit = e =>{
        e.preventDefault()
        // validar el formulario
        if([nombre, propietario, email, fechaEgreso, sintomas].includes('')){
            SetAlerta ({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        SetAlerta({})
        setTimeout(() => { SetAlerta({}) }, 3000)
        guardarPacientes({nombre, propietario, email, fechaEgreso, sintomas, id})
        SetAlerta({msg: "Modificado correctamente"})
        setNombre('')
        setPropietario('')
        setEmail('')
        setFechaEgreso('')
        setSintomas('' )
        setId('')

    }
    const { msg } = alerta
  return (
    <>
        <h2 className=" font-black text-3xl text-center">
           Administrador de pacientes
        </h2>
        <p className=" text-xl mt-5 mb-10 text-center"> Añade tus pacientes y
              <span className=" text-indigo-600 font-bold"> Administralos</span>
        </p>
        <form
            className="bg-white py-10 px-5 mb-10 lg:mb-5 md:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold"
                >Nombre de la mascota</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) }
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="propietario"
                    className="text-gray-700 uppercase font-bold"
                >Nombre del propietario</label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={ e => setPropietario(e.target.value) }
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold"
                >Email del propietario</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Email del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="fechaEgreso"
                    className="text-gray-700 uppercase font-bold"
                >Fecha egreso</label>
                <input 
                    id="fechaEgreso"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEgreso}
                    onChange={ e => setFechaEgreso(e.target.value) }
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold"
                >Sintomas</label>
                <textarea  
                    id="sintomas"
                    placeholder="Describa los sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={ e => setSintomas(e.target.value) }
                />
            </div>

            <input
                type="submit"
                className="bg-indigo-600 text-white font-bold p-3 rounded-xl w-full uppercase hover:bg-indigo-900 cursor-pointer transition-colors"
                value={ id ?"Guardar Cambios" : "Agregar Paciente"}
            />
        </form>
        {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

export default Formulario