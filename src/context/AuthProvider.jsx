import {useState, useEffect, createContext, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import clienteAxios from '../config/axios'

const  AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const[auth, setAuth] = useState({})
    const [cargando, setCargando]= useState(true)

    const {state} = useLocation()   
    const apv_token_ = localStorage.getItem('apv_token_')
    let token
    if (state === null){
         token = apv_token_
    }else{
        token = state.token     
    }

    useEffect(() =>{
        const auntenticarUsuario = async () => {
            if(!token) return
            const config = {
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            try {
                const {data} =await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({}) 
            }
            setCargando(false)    
        }

        auntenticarUsuario()
    }, [token])

    const cerrarSesion = ()=>{
        localStorage.removeItem('apv_token_')
        setAuth({})
    }

    const actualziarPerfil = async datos =>{
        if(!token) return
            const config = {
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
        
        try {
             await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config)
             return({
                msg:'Datos Guardados correctamente'
             })
        } catch (error) {
            return({
                msg: error.response.data.msg,
                error: true
            })
            
        }
           
    }

    const guardarPassword = async datos =>{
        if(!token) return
        const config = {
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        try {
            const {data} =await clienteAxios.put('/veterinarios/actualizar-password', datos, config)
            return({
               msg: data.msg
            })
        } catch (error) {
            return({
                msg: error.response.data.msg,
                error: true
             })
            
        }

    }

  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualziarPerfil,
            guardarPassword
        }}
    >

        {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
    return useContext(AuthContext)
    
}

export{
    AuthProvider,
    useAuth,

}
export default AuthContext