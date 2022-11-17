import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import theme from '../../theme'

const Users = () => {
  const [users, setUsers] = useState([])

  //run api go get all the users.
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    getAllUsers(signal)

    //cleanup.
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  //get the users.
  const getAllUsers = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/users`)

    // console.log(data)
    //update the setState.
    setUsers(data)
  }


  return (
    <Paper elevation={4} sx={{
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }}>
      <Typography variant='h6' sx={{
        margin: 'auto',
        color: theme.palette.secondary.main
      }}>All Users</Typography>
      <List dense>
        {!users.length ? 'There Is No Registered User' : users.map((item, i) => {
          return (
            <Link to={`/user/${item._id}`} key={i} style={{ textDecoration: 'none' }}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton color='inherit'>
                    <ArrowForwardIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </Link>
          )
        })}
      </List>
    </Paper>
  )
}

export default Users