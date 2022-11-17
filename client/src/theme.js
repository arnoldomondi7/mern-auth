import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            light: '#5c67a3',
            main: '#3f4771',
            dark: '#2e355b',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff79bo',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#fff'
        },
    },
})

export default theme