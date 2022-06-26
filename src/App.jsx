
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//BrowserRouter todo debe estar rodeado por este pquete 
// Routes permite agrupar diferentes rutas
// Route para una ruta expecifica
import Authlayout from './layout/Authlayout';
import RutasProtegidas from './layout/RutasProtegidas';

import Login from './paginas/Login'
import Registrar from './paginas/Registrar';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import OlvidePasswork from './paginas/OlvidePasswork';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvaider } from './context/PacientesProvaider'

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
         <PacientesProvaider>
            <Routes>
               <Route path='/' element={<Authlayout />}>
                  <Route index element={<Login/>}/> {/* index define la ruta de la pagina principa, en este caso loguin  */}
                  <Route path='registrar' element={<Registrar/>} />
                  <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />
                  <Route path='olvide-passwork' element={<OlvidePasswork/>} />
                  <Route path='olvide-passwork/:token' element={<NuevoPassword/>} />
               </Route>

               <Route path='/admin' element={<RutasProtegidas />}>
                  <Route index element={<AdministrarPacientes />}/>
                  <Route path='perfil' element ={<EditarPerfil/>}/>
                  <Route path='cambiar-password' element ={<CambiarPassword/>}/>
               </Route>
            </Routes>
         </PacientesProvaider>
      </AuthProvider>
   </BrowserRouter> 
  )
}

export default App;
