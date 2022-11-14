import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.page'
import Users from './pages/public/Users.public'

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
        </Routes>
    )
}

export default MainRouter 