import User from '../models/user.model'
import { comparePassword } from '../helpers/auth.helper'
import jwt from 'jsonwebtoken'
import config from '../config/config.config'

//sign in user.
export const signIn = async (req, res) => {

    //destructure the details from the frontend
    const { email, password } = req.body

    try {

        //check to ensure that the email exists.
        const user = await User.findOne({ email })

        //handle the error to ensure that the emaul exists.
        if (!user) {
            return res.json({
                error: 'User Does Not Exist, Please Sign Up'
            })
        }

        //if email is ok, then compare the password.
        //compare the password, with that saved in the db.
        const match = await comparePassword(password, user.password)

        //handle the error.
        //ensure that indeed the passwords match.
        if (!match) {
            return res.json({
                error: 'Invalid Password, Please Try Again'
            })
        }

        //if there is no issue create token.
        const token = jwt.sign({ _id: user._id }, config.jwt_Secret)

        //let the cookie handle the expiry date.
        res.cookie('t', token, { expire: new Date + 999 })

        //send the id,email, name,token,
        return res.json({
            token, user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.json({
            error: 'Unable To Sign In, Please Try Again.'
        })
    }
}

//signout user.
export const signOut = async (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: 'User Was Signed Out'
    })
}

