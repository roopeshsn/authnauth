import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PrivateRoutes = () => {
    const { auth } = useAuth()
    return(
        auth.email ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes