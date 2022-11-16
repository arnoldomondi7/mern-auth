import express from 'express'

//user sign in and sign out.
import { signIn, signOut } from '../controllers/auth.controller'

const router = express.Router()

//user sign in
router.route('/signin').post(signIn)

//user signout
router.route('/signout').get(signOut)

//export the route.

module.exports = router
