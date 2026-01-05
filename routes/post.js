import { Router } from 'express'
import { auth } from '../controllers/authController.js'
import post from '../controllers/postController.js'
const router = Router()

router.get('/', post.getAll)
router.post('/', auth, post.post)
router.get('/:postId', post.get)
router.put('/:postId', auth, post.put)
router.patch('/:postId', auth, post.patch)
router.delete('/:postId', auth, post.del)

export default router