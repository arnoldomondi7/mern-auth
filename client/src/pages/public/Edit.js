import React, { useEffect, useState } from 'react'
import {
    useParams,
    useNavigate
} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography
} from '@mui/material'
import theme from '../../theme'

const Edit = () => {

    //handle the state.
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    //handle the param.
    const { userId } = useParams()
    const navigate = useNavigate()

    //get the token.
    const jwt = auth.isAuthenticated()

    useEffect(() => {

        //redirect to the home page if signed in.
        if (!auth.isAuthenticated()) {
            navigate('/signin')
        }
    })

    //prepopulate the request with data
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        //get a single user.
        const getSingleUser = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/user/${userId}`, {

                    //pass the tokens.
                    headers: {
                        Authorization: `Bearer ${jwt.token}`
                    }
                })

                //handle the error messages.
                if (data && data.error) {

                    //redirect the user to the sign in page.
                    toast.info(data.error)
                }

                //update the userState with this data.
                setName(data.name)

            } catch (error) {
                console.log(error.message)
            }
        }
        getSingleUser(signal)

        //clean up the function.
        return function cleanup() {
            abortController.abort()
        }
    }, [jwt.token, navigate, userId])

    //code to handle the function when its submitted.
    const handleSubmit = async (event) => {
        event.preventDefault()

        const jwt = auth.isAuthenticated()

        setLoading(true)

        //api to update the data.
        const { data } = await axios.put(`${process.env.REACT_APP_API}/user/${userId}`, {
            name
        }, {

            //pass the tokens.
            headers: {
                Authorization: `Bearer ${jwt.token}`
            }
        })

        if (data && data.error) {
            setLoading(false)
            setName('')
            return toast.error(data.error)
        }
        setLoading(false)
        toast.success('User Was Successfully Updated')
        navigate(`/user/${userId}`)
    }

    return (
        <Card sx={{
            maxWidth: 600,
            margin: 'auto',
            textAlign: 'center',
            marginTop: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        }}>
            <CardContent>
                <Typography> Edit</Typography>
                <TextField
                    sx={{
                        marginLeft: theme.spacing(1),
                        marginRight: theme.spacing(1),
                        width: 350
                    }}
                    label='Name'
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    margin='normal'

                />
                <br />
            </CardContent>
            <CardActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleSubmit}
                    sx={{
                        margin: 'auto',
                        marginBottom: theme.spacing(2)
                    }}
                >
                    {loading ? 'Working On It...' : 'Update User'}
                </Button>
            </CardActions>
        </Card>
    )
}

export default Edit