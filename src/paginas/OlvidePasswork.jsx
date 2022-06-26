import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../componens/Alerta"
import clienteAxios from "../config/axios"

const OlvidePasswork = () => {
  
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  

  const handleSubmit = async e =>{
    e.preventDefault()
    if(email === '' || email.length < 6){
      setAlerta( { msg:' El email es obligatorio', error: true } )
      return
    }

    try {
        const {data} = await clienteAxios.post('/veterinarios/olvidar-password',{email})
        setAlerta( {
          msg: data.msg,
          error: false })       
    
    } catch (error) {
        setAlerta( {
        msg: error.response.data.msg,
        error: true })
    }

  }
  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-2xl text justify-center md:text-6xl ">
          Recupera tu cuenta y no pierdas <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl hover:bg-gray-100"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form> 
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-900 hover:font-bold"
            to="/">¿Ya tienes una cuenta? Inicia sesion</Link>
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-900 hover:font-bold"
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav> 
      </div>
    </>
  )
}

export default OlvidePasswork