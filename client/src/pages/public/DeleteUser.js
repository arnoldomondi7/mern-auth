import React, { useState } from 'react'
import auth from '../../auth/auth-helper'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteUser = ({ userId }) => {
    const [open, setOpen] = useState(false)
    //handle the hooks.

    const navigate = useNavigate()

    const jwt = auth.isAuthenticated()

    //function to open the dialogeu.
    const clickButton = () => {
        setOpen(true)
    }

    //function to close the dialogue box.
    const handleRequestClose = () => {
        setOpen(false)
    }

    //delete the account.
    const handleDeleteAccount = async () => {
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/user/${userId}`, {
            //pass the tokens.
            headers: {
                Authorization: `Bearer ${jwt.token}`
            }
        })

        if (data && data.error) {
            console.log(data.error)
            return toast.info(data.error)
        }

        auth.clearJWT(() => console.log('deleted'))
        toast.info('User Was Deleted')
        navigate('/signup')
    }
    return (
        <span>

            <IconButton aria-label='Delete' onClick={clickButton} color='error'>
                <Tooltip title='delete user' placement='top' arrow>
                    <DeleteIcon />
                </Tooltip>

            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Confirm To Delete Your Account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAccount} color='error' autoFocus='autoFocus'>
                        Confirm
                    </Button>
                </DialogActions>


            </Dialog>
        </span>
    )
}


export default DeleteUser