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
    const openDialgue = () => {
        setOpen(true)
    }

    //function to close the dialogue box.
    const closeDialgue = () => {
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

        //clear the tokens
        auth.clearJWT(() => toast.error(data.message))

        navigate('/signup')
    }
    return (
        <span>
            <IconButton aria-label='Delete' onClick={openDialgue} color='error'>
                <Tooltip title='delete user' arrow placement='top' >
                    <DeleteIcon />
                </Tooltip>
            </IconButton>
            <Dialog open={open} onClose={closeDialgue}>
                <DialogTitle>Delete Account ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Confirm To Delete Your Account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialgue} color='success'>
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