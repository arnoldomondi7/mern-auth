import React, { useEffect, useState } from 'react'
import auth from '../../auth/auth-helper'
import {
    useParams,
    useNavigate,
    Link
} from 'react-router-dom'
import axios from 'axios'
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography
} from '@mui/material'
import theme from '../../theme'
import PersonIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'
import DeleteUser from './DeleteUser'

function Profile() {
    const [user, setUser] = useState({})
    const jwt = auth.isAuthenticated()
    let { userId } = useParams()
    let navigate = useNavigate()

    //send user to sign in if not authenticated.
    useEffect(() => {
        if (!jwt.token) {
            navigate('/signin')
        }
    })

    //fetch users data.
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
                    return navigate('/signin')
                }

                //update the userState with this data.
                setUser(data)

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


    return (

        <Paper sx={{
            maxWidth: 600,
            margin: 'auto',
            padding: theme.spacing(3),
            marginTop: theme.spacing(5)
        }} elevation={5}>
            <Typography variant='h6' sx={{
                marginTop: theme.spacing(3),
                color: theme.palette.primary.dark
            }}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />{

                        //compare if the id of the user is same as the
                        //is the same as the id of the data being displayed
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id ===
                        user._id && (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton aria-label='Edit' >
                                        <EditIcon style={{ color: '#1DB954' }} />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(user.created)).toDateString()} />
                </ListItem>
            </List>
        </Paper>
    )
}

export default Profile