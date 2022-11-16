import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './auth/auth-Privateroute'
import Home from './pages/Home.page'
import Edit from './pages/public/Edit'
import Menu from './pages/public/Menu'
import Profile from './pages/public/Profile'
import Signin from './pages/public/Signin'
import Signup from './pages/public/Signup'
import Users from './pages/public/Users.public'

const MainRouter = () => {
    return (
        <>
            <Menu />
            <Routes>
                {/* private route */}
                <Route element={<PrivateRoute />}>
                    <Route path='/user/edit/:userId' element={<Edit />} />
                </Route>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/user/:userId' element={<Profile />} />


            </Routes>
        </>
    )
}

export default MainRouter 