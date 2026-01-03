import { Router } from 'express'
import controller, { auth } from '../controllers/authController.js'
const router = Router()

router.get('/protected', auth, controller.getProtected)
router.post('/login', controller.postLogIn)
router.post('/signup', controller.postSignUp)

export default router