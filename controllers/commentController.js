import { prisma } from '../lib/prisma.js'

async function post(req, res) {
    const postId = Number(req.params.postId)
    console.log(req.params.postId)
    const comment = await prisma.comment.create({
        data: { 
            content: req.body.content,
            userId: req.user? req.user.id : NULL,
            postId
        }
    })
    res.status(201).send(comment)
}

async function get(req, res) {
    console.log(req.user)
    const commentId = Number(req.params.commentId)
    const comment = await prisma.comment.findUnique({
        where: { 
            id: commentId
        }
    })
    res.status(200).send(comment)
}

async function put(req, res) {
    const commentId = Number(req.params.commentId)
    const userId = await prisma.comment.findUnique({
        where: { 
            id: commentId
        }
    }).userId
    if (userId !== req.user.id && req.user.role !== 'ADMIN') return res.status(401)

    const comment = await prisma.comment.update({
        where: { 
            id: commentId
        },
        data: {
            content: req.body.content
        }
    })
    res.status(200).send(comment)
}

async function del(req, res) {
    const commentId = Number(req.params.commentId)
    const userId = await prisma.comment.findUnique({
        where: { 
            id: commentId
        }
    }).userId
    if (userId !== req.user.id && req.user.role !== 'ADMIN') return res.status(401)
    
    await prisma.comment.delete({
        where: { 
            id: commentId
        }
    })
    res.status(204).send()
}

async function getAll(req, res) {
    const postId = Number(req.params.postId)
    const comments = await prisma.comment.findMany({
        where: {
            postId
        }
    })
    res.status(200).send(comments)
}

const commentController = {
    post,
    get,
    put,
    del,
    getAll
}

export default commentController