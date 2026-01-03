import { Router } from 'express'
import authRouter from './auth.js'
import postRouter from './post.js'

const router = Router()

router.use('/', authRouter)
router.use('/posts', postRouter)

export default router