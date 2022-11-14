import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.page'
import Signin from './pages/public/Signin'
import Signup from './pages/public/Signup'
import Users from './pages/public/Users.public'

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
        </Routes>
    )
}

export default MainRouter 