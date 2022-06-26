import { createContext, useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import clienteAxios from '../config/axios'

const pacientesContext = createContext()


const PacientesProvaider = ({children}) => {
    const [pacientes, setPacientes ] = useState([])
    const [paciente, setPaciente] = useState({})
    const {state} = useLocation()   
    const apv_token_ = localStorage.getItem('apv_token_')
    let token
    if (state === null){
         token = apv_token_
    }else{
        token = state.token     
    }
       
    useEffect (() => {
        const config = {
            headers: {  
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const obtenerPacientes = async () =>{
             try {   
                if(!token) return
                const { data } = await  clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    },[token])


    const guardarPacientes = async (paciente)=>{
        const config = {
            headers: {  
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteAcualizado = pacientes.map(pacientesState => pacientesState._id === data._id ? data : pacientesState)
               setPacientes(pacienteAcualizado)
            } catch (error) {
                console.log(error.response.data.msg)
                
            }
        }else{
          
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const{createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
              setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
                
            }

        }
       

    }
    
    const setEdicion = paciente => {
        setPaciente(paciente)
    }  

    const eliminarPaciente = async id => {
      
        const Confirmar = confirm('Esta seguro que desea eliminar este paciente?')
        if (Confirmar){
            try {
                const token = localStorage.getItem('apv_token_')
                const config = {
                    headers: {  
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualziados = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualziados)
            } catch (error) {
                console.log(error.response.data.msg)
                
            }
        }
    }  

  return (
    <pacientesContext.Provider
        value={{
            pacientes,
            guardarPacientes,
            setEdicion, 
            paciente,
            eliminarPaciente
        }}
    >

        {children}
    </pacientesContext.Provider>

  ) 
}

const usePacientes = () => {
    return useContext(pacientesContext)
}
export{
    PacientesProvaider,
    usePacientes
}

export default pacientesContext