import { expressjwt } from "express-jwt"
import config from '../config/config.config'

//require signin.
export const requireSignIn = expressjwt({
    secret: config.jwt_Secret,
    algorithms: ["HS256"],
})

//hasAuthorization.
export const hasAuthorization = async (req, res, next) => {

    //req.(profule, auth, profile._id == auth._id)
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id

    //handle error if user is not authorized..
    if (!authorized) {
        return res.status(403).json({
            error: 'User Is Not Authorized To Access This Resource'
        })
    }

    //if user is authorized grant access to the resource.
    next()
}