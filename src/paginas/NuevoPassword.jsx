import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import clienteAxios from "../config/axios"
import Alerta from "../componens/Alerta"


const NuevoPassword = () => {

  const [ password, setPassword ] = useState( '' )
  const [ repetirpassword, setRepetirPassword ] = useState( '' )
  const [ alerta, setAlerta ] = useState( {} )
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const {token} = params

  useEffect(()=> {
    const comprobarToken = async ()=>{
      try {
        await clienteAxios.get( `/veterinarios/olvidar-password/${token}` )
        setAlerta( { msg: 'Ingresa tu nuevo password' } )
        setTokenValido(true)
      } catch (error) {
        setAlerta( {
         msg: 'Hubo un error con el link de restauraciòn, puedes intentarlo nuevamente màs tarde o solicitar nuevamente el restablecimiento de la contraseña',
         error: true
        } )
      }
    }
    comprobarToken()
  
  },[] )

  const handleSubmit = async e =>{
    e.preventDefault();
    if ( [password, repetirpassword ].includes('')){
      setAlerta({msg:'Hay campos vacios', error:true})
      return
    }

    if(password.length < 6){
      setAlerta({msg:'La contraseña es muy corta, agrega minimo 6 caracteres', error:true})
      return
    }

    if(password !== repetirpassword){
      setAlerta({msg:'Las contraseñas son diferentes', error:true})
      return
    }
    setAlerta({})
    // almacenar nueva contraseña  
    try {
      const url = `/veterinarios/olvidar-password/${token}`
     const { data } =  await clienteAxios.post( url, { password } )
      setAlerta( {
        msg: data.msg,
        error: false
      } )
      setPassword('')
      setRepetirPassword('')
      setPasswordModificado(true)
        
    } catch ( error ) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  } 
  const { msg }= alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-2xl text justify-center md:text-6xl ">
          Restablece tu password y no pierdas el acceso a <span className="text-black">tus Pacientes</span>
        </h1>
      </div> 
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
       {msg && <Alerta 
            alerta={ alerta }
        /> }
        { tokenValido && (
          <>
            <form
              onSubmit={ handleSubmit } 
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold ">
                  Nuevo password
                </label>
                <input 
                  type="password"
                  placeholder="Ingresa un nuevo password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl hover:bg-gray-100"
                  value={password}
                  onChange={ e => setPassword( e.target.value ) }
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold ">
                  Repetir password
                </label>
                <input 
                  type="password"
                  placeholder="Repite tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl hover:bg-gray-100"
                  value={repetirpassword}
                  onChange={ e => setRepetirPassword( e.target.value ) }
                />
              </div> 
              <input 
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
            { passwordModificado && (
              <nav className="mt-10 text-center">
                <Link className="block text-center text-xl my-5 text-gray-600 hover:text-indigo-900 hover:font-bold"
                  to="/">Iniciar sesion</Link>
              </nav> 
            ) }
          </>
        )  } 
      </div>
    </>
  )
}

export default NuevoPassword