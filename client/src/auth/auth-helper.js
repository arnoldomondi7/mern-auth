import { signout } from './api-auth.js'

const auth = {
    //to access sensitive routes
    //to ensure that the user is actually signed in.
    isAuthenticated() {
        if (typeof window == "undefined")
            return false

        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    },
    //save token when user signs in
    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
        next()
    },
    clearJWT(next) {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
        next()
        //optional
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
}

export default auth
