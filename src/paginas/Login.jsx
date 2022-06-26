import { useState, useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../componens/Alerta"
import clienteAxios from "../config/axios"
import{useAuth} from '../context/AuthProvider'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
   
    if ([email, password].includes('')){
      setAlerta({
        msg:'Los campos de correo y password son obligatorios',
        error:true
      })
      return
    }
    if (email === ''){
      setAlerta({
        msg:'El campo de correo es obligatorio',
        error:true
      })
      return
    }
    if (password === ''){
      setAlerta({
        msg:'El campo de password es obligatorio',
        error:true
      })
      return
    }
    try {
      const {data} = await clienteAxios.post( '/veterinarios/login', { email, password } )
      localStorage.setItem('apv_token_', data.token)
      setAlerta({})
      setAuth(data)
      navigate('/admin') 
    } catch (error) {
      setAlerta( {  
        msg:error.response.data.msg,
        error:true
      } )      
    }

  }
  const{msg} = alerta
 
  return (
    <>
      
      <div>
        <h1 className="text-indigo-600 font-black text-4xl text justify-center md:text-6xl ">
          Inicia Sesión y Administra Tus <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta 
          alerta= {alerta}
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
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Password
            </label>
            <input 
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl hover:bg-gray-100"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input 
              type="submit"
              value="Inicia Sesion"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
        </form>  
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-900 hover:font-bold"
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-900 hover:font-bold"
            to="/olvide-passwork">Olvide mi password</Link>
        </nav>     
      </div>
  
    </>
  )
}

export default Login