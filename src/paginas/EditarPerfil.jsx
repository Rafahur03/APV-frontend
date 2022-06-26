import { useEffect, useState } from "react"
import AdminNav from "../componens/AdminNav"
import {useAuth} from '../context/AuthProvider'
import Alerta from '../componens/Alerta'
import clienteAxios from "../config/axios"

 

const EditarPerfil = () => {

  const {auth, actualziarPerfil} = useAuth()
  const [perfil, setPerfil] = useState({})
  const [ alerta, setAlerta]  = useState({})
  useEffect(() => {
    setPerfil(auth)

  },[auth])

  const handleSubmit = async e =>{
    e.preventDefault()
    const {nombre, email} = perfil

    if([nombre, email].includes('')){
        setAlerta({
          msg:"email y nombre son obligatorios",
          error:true
        })
        setTimeout(() => { setAlerta({}) }, 2500)
        return
      }
    setAlerta({})
    const resultado = await actualziarPerfil(perfil)
    setAlerta(resultado)

  }

  const {msg} = alerta
  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu 
            <span className="text-indigo-600 font-bold"> Informacion aqui</span>
        </p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta
                  alerta={alerta}
                />}
                <form onSubmit={handleSubmit} >
                    <div className="my-3">
                      <label 
                        htmlFor="nombre"
                        className="font-bold uppercase text-gray-700"
                     >
                        nombre
                      </label>
                      <input 
                        id="nombre"
                        type="text"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="nombre"
                        value={perfil.nombre || 'ingresa tu nombre'}
                        onChange={e => setPerfil({
                          ...perfil,
                          [e.target.name]:e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label 
                        htmlFor="email"
                        className="font-bold uppercase text-gray-700"
                     >
                        email
                      </label>
                      <input 
                        id="email"
                        type="email"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="email"
                        value={perfil.email || 'Ingresa tu email'}
                        onChange={e => setPerfil({
                          ...perfil,
                          [e.target.name]:e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label 
                        htmlFor="telefono"
                        className="font-bold uppercase text-gray-700"
                     >
                        telefono
                      </label>
                      <input 
                        id="telefono"
                        type="text"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="telefono"
                        value={perfil.telefono || 'Ingresa un numero telefonico'}
                        onChange={e => setPerfil({
                          ...perfil,
                          [e.target.name]:e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label 
                        htmlFor="web"
                        className="font-bold uppercase text-gray-700"
                     >
                       sitio web
                      </label>
                      <input 
                        id="web"
                        type="text"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="web"
                        value={perfil.web || 'Ingresa tu direccion web'}
                        onChange={e => setPerfil({
                          ...perfil,
                          [e.target.name]:e.target.value
                        })}
                      />
                    </div>
                    <input
                        type="submit"
                        className="bg-indigo-600 text-white font-bold p-3 rounded-xl w-full uppercase hover:bg-indigo-900 cursor-pointer transition-colors"
                        value="Guardar Cambios"
                     />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil