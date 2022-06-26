import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNav from "../componens/AdminNav"
import Alerta from "../componens/Alerta"
import { useAuth } from '../context/AuthProvider'




const CambiarPassword = () => {
  const { guardarPassword } = useAuth()
  const [ alerta, setAlerta]  = useState({})
  const [ password, setPassword]  = useState({})
  const navigate = useNavigate()

  const handleSubmit = async e =>{
    e.preventDefault()
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error:true
      })
      return
    }
    if(password.nuevoPassword.length < 6){
      setAlerta({
        msg: "Las Nueva contraseña debe tener al menos 6 caracteres",
        error:true
      })
      return
    }

    if(password.nuevoPassword !== password.repetirPassword){
      setAlerta({
        msg: "Las Nuevas contraseñas no coinciden",
        error:true
      })
      return
    }

   const respuesta = await guardarPassword(password)
   setAlerta(respuesta)
   setPassword({})
   setTimeout(() => {navigate('/admin/perfil') }, 4000)
  
   


  }
  const { msg }= alerta
  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu 
            <span className="text-indigo-600 font-bold"> Password aqui</span>
        </p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta
                      alerta={alerta}
                />}
                <form onSubmit={handleSubmit} >
                    <div className="my-3">
                      <label 
                        htmlFor="passwordactual"
                        className="font-bold uppercase text-gray-700"
                     >
                        Password Actual
                      </label>
                      <input 
                        id="passwordactual"
                        type="password"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="passwordactual"
                        placeholder="Escribe tu Password Actual"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label 
                        htmlFor="nuevoPassword"
                        className="font-bold uppercase text-gray-700"
                     >
                        nuevo password
                      </label>
                      <input 
                        id="nuevoPassword"
                        type="password"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="nuevoPassword"
                        placeholder="Escribe tu Nuevo Password"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label 
                        htmlFor="repetirPassword"
                        className="font-bold uppercase text-gray-700"
                     >
                        repetir nuevo password
                      </label>
                      <input 
                        id="repetirPassword"
                        type="password"
                        className="border bg-gray-100 w-full py-2 mt-5 rounded-lg"
                        name="repetirPassword"
                        placeholder="Repite tu Nuevo Password"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                      />
                    </div>
                    <input
                        type="submit"
                        className="bg-indigo-600 text-white font-bold p-3 my-5 rounded-xl w-full uppercase hover:bg-indigo-900 cursor-pointer transition-colors"
                        value="Guardar Password"
                     />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword