import { hashPassword } from '../helpers/auth.helper'
import User from '../models/user.model'
import _ from 'lodash'

//create a new user
export const createUser = async (req, res) => {

    //get data from the frontend.
    const { name, email, password } = req.body

    //handle the validation.
    if (!name) {
        return res.json({
            error: 'Name Is Required'
        })
    }

    if (!password || password.length < 8) {
        return res.json({
            error: 'Password Should Be At least 8 Characters'
        })
    }

    //ensure that the email does not exist.
    const exist = await User.findOne({ email })

    //logic to log an error if the email already exists.
    if (exist) {
        return res.json({
            error: 'Email Is Already In Use, Pick A New Email'
        })
    }

    //hash the password.
    const hashedPassword = await hashPassword(password)

    //if not, create a new user.
    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    //save the user.
    try {
        await user.save()

        //send success to the user.
        res.status(201).json({
            message: `${name}, was successfully siged up`
        })
    } catch (error) {
        return res.json({
            error: 'Unable To Sign In The User.'
        })
    }
}

//get all the users.
export const getUsers = async (req, res) => {
    try {

        //get all the users.
        const users = await User.find().select('name email updated created')

        //send res to the users.
        res.json(users)
    } catch (error) {
        return res.json({
            error: 'Unable To Get The Users.'
        })
    }
}

//this functions is to get the user.
//specific user before you can perfom any operation to this user.
export const userById = async (req, res, next, id) => {
    try {

        //find the user by id
        const user = await User.findById(id)

        //handle the error i
        if (!user) {
            return res.json({
                error: 'User Not Found'
            })
        }

        //what to do, if the user was found.
        //create the req.profile then connect to the user.
        req.profile = user

        //go to the next function.
        next()
    } catch (error) {
        return res.json({
            error: 'Unable To Load The User.'
        })
    }
}

//get the specific user to the frontend.
//after it has passed the abcove check.
export const getUser = async (req, res) => {
    try {

        //block the password.
        req.profile.password = undefined

        //send the user to the profile.
        res.json(req.profile)
    } catch (error) {
        return res.json({
            error: 'Unable To Load The User.'
        })
    }
}

//update the user.
export const updateUser = async (req, res) => {
    try {

        //hold the users data in the req.profile
        let user = req.profile

        //use lodash to update.
        user = _.extend(user, req.body)

        //update the date.
        user.updated = Date.now()

        //save the user
        await user.save()

        //sanitize the password.
        user.password = undefined

        //send the response to the frontend.
        res.json(user)

    } catch (error) {
        return res.status(400).json({
            error: 'Faild To Update The User'
        })
    }
}

//delete the user.
export const deleteUser = async (req, res) => {
    try {
        let user = req.profile
        const deleteUser = await user.remove()

        //undefine the password.
        user.password = undefined

        //send the response to the user.
        res.json({
            message: `${user.name}, was Deleted`
        })

    } catch (error) {
        return res.status(400).json({
            error: 'Faild To Delete The User'
        })
    }
}

