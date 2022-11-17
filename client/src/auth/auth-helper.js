import axios from 'axios'

const auth = {

    //save token when user signs in.
    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
        next()
    },

    //to access sensitive routes
    //to ensure that the user is actually signed in.
    isAuthenticated() {

        //if there is no tokens dont give access.
        if (typeof window == "undefined") {
            return false
        }

        //get the tokens that was stored in the authenticate.
        //the give access
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'))
        }
        return false
    },

    //used to signout
    clearJWT(next) {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem('jwt')
        }
        next()

        //optional.
        //clear the cookies.
        axios.get(`${process.env.REACT_APP_API}/signout`).then(({ data }) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
}

export default auth
