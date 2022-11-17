import express from 'express'

//controller function
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    userById
} from '../controllers/user.contoller'

//middlewares to handle.

import { hasAuthorization, requireSignIn } from '../middlewares/auth.middleware'

const router = express.Router()

//sign up
router.route('/signup').post(createUser)
//sign in
router.route('/users').get(getUsers)

//get user, update user, delete user
router.route('/user/:userId')
    .get(requireSignIn, getUser)
    .put(requireSignIn, hasAuthorization, updateUser)
    .delete(requireSignIn, hasAuthorization, deleteUser)


//handle the userId.
router.param('userId', userById)

//export the routes.
module.exports = router