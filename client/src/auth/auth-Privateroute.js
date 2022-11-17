import { Outlet, Navigate } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = () => {

    //logically check if Outlet is authenticated or else redirect to the signin
    return (
        auth.isAuthenticated() ? <Outlet /> : <Navigate to='/signin' />
    )
}

export default PrivateRoute