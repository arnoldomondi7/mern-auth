import { Outlet, Navigate } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = () => {
    return (
        auth.isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
    )
}

export default PrivateRoute