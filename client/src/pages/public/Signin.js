import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Box,
    TextField,
    Typography
} from '@mui/material'
import { useNavigate, Navigate } from 'react-router-dom'
import theme from '../../theme'
import auth from '../../auth/auth-helper'


const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    //activate the hook.
    let navigate = useNavigate()

    //function to handle when, form is submitted.
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/signin`, {
                email, password
            })

            //handle the error.
            if (data.error) {
                return toast.error(data.error)
            }
            auth.authenticate(data, () => {
                setEmail('')
                setPassword('')
                setLoading(false)
                toast.info(`${data.user.name}, Was Successfully Signed In. `)

            })

            //redirect to the sign in.
            navigate('/')

        } catch (error) {
            setLoading(false)
            console.log(error)

        }

    }

    //redirect to the home page if signed in.
    if (auth.isAuthenticated()) {
        <Navigate to='/home' />
    }
    return (
        <div>

            <Card sx={{
                maxWidth: 600,
                margin: 'auto',
                textAlign: 'center',
                marginTop: theme.spacing(5),
                paddingBottom: theme.spacing(2)
            }}>
                <CardContent>
                    <Typography sx={{
                        marginTop: theme.spacing(2),
                        color: theme.palette.openTitle
                    }}>Sign In</Typography>


                    <TextField
                        type='email'
                        sx={{
                            marginLeft: theme.spacing(1),
                            marginRight: theme.spacing(1),
                            width: 300
                        }}
                        id='email'
                        label='Email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        margin='normal'
                    />
                    <br />

                    <TextField
                        type='password'
                        sx={{
                            marginLeft: theme.spacing(1),
                            marginRight: theme.spacing(1),
                            width: 300
                        }}
                        id='password'
                        label='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        margin='normal'
                    />
                    <br />
                </CardContent>
                <CardActions>
                    <Box sx={{
                        display: 'flex',
                        margin: 'auto',
                        marginBottom: theme.spacing(2)
                    }}>
                        <Button

                            color='primary'
                            variant='contained'
                            onClick={handleSubmit}>
                            {loading ? 'working on it..' : 'Sign In'}
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </div>
    )
}

export default Signin