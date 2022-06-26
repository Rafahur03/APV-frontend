import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-6'>
        <Link
            to='/admin/perfil'
            className='font-bold uppercase text-gray-800'
        >Perfil</Link>
        <Link
            to='/admin/cambiar-password'
            className='font-bold uppercase text-gray-800'
        >Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav