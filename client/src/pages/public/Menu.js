import React from 'react'
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import auth from '../../auth/auth-helper'

const Menu = () => {

    //active style
    let activeStyle = {
        textDecoration: "none",
        color: '#ff4081'
    }

    //not active
    let normalStyle = {
        color: '#fff',
        textDecoration: "none",
    }

    const navigate = useNavigate()

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN Social
                </Typography>
                <NavLink to="/" style={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                }>
                    <IconButton aria-label="Home" color='inherit' >
                        <Tooltip title='home' arrow placement='top-end'>
                            <HomeIcon />
                        </Tooltip>

                    </IconButton>
                </NavLink>
                <NavLink to='/users' style={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                } >
                    <Button color='inherit' >Users</Button>
                </NavLink>

                {
                    !auth.isAuthenticated() && (
                        <span>
                            <NavLink to='/signup' style={({ isActive }) =>
                                isActive ? activeStyle : normalStyle
                            }  >
                                <Button color='inherit'>Sign Up</Button>
                            </NavLink>
                            <NavLink to='/signin' style={({ isActive }) =>
                                isActive ? activeStyle : normalStyle
                            }>
                                <Button st color='inherit'>Sign In</Button>
                            </NavLink>
                        </span>
                    )
                }

                {
                    auth.isAuthenticated() && (
                        <span>
                            <NavLink to={"/user/" + auth.isAuthenticated().user._id} style={({ isActive }) =>
                                isActive ? activeStyle : normalStyle
                            }>
                                <Button color='inherit' >
                                    Profile
                                </Button>
                            </NavLink>


                            <Button color='inherit' onClick={() => { auth.clearJWT(() => navigate('/')) }}>
                                Sign Out
                            </Button>

                        </span>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Menu