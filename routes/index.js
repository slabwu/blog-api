import { Router } from 'express'
import authRouter from './auth.js'
import postRouter from './post.js'
import commentRouter from './comment.js'

const router = Router()

router.use('/', authRouter)
router.use('/posts', postRouter)
router.use('/posts/:postId/comments', commentRouter)

export default router