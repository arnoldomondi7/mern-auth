import React from 'react'
import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material'
import Bike from '../assets/images/bike.jpg'
import theme from '../theme'

const Home = () => {
    return (
        <Card sx={{
            maxWidth: 600,
            margin: 'auto',
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5)
        }}>
            <Typography sx={{
                padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
                color: theme.palette.primary.dark
            }}
                variant='h6'>Home Page</Typography>
            <CardMedia sx={{ minHeight: 450 }} image={Bike} title='Sports Bike' />
            <Typography variant="body2" component="p" sx={{
                padding: 1,
                textAlign: 'right',
                backgroundColor: '#ededed',
                borderBottom: '1px solid #d0d0d0',
                '& a': {
                    color: '#3f4771'
                }
            }}>Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography>
            <CardContent>
                <Typography variant='body1' component='p' >
                    Welcome To The MERN Skeleton home page.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Home