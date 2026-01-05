import { Router } from 'express'
import { auth, getUser } from '../controllers/authController.js'
import comment from '../controllers/commentController.js'
const router = Router({ mergeParams: true })

router.get('/', comment.getAll)
router.post('/', getUser, comment.post)
router.get('/:commentId', comment.get)
router.put('/:commentId', auth, comment.put)
router.delete('/:commentId', auth, comment.del)

export default router