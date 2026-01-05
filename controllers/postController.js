import { prisma } from '../lib/prisma.js'

async function post(req, res) {
    const post = await prisma.post.create({
        data: { 
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id,
        }
    })
    res.status(201).send(post)
}

async function get(req, res) {
    const postId = Number(req.params.postId)
    const post = await prisma.post.findUnique({
        where: { 
            id: postId
        }
    })
    res.status(200).send(post)
}

async function put(req, res) {
    const postId = Number(req.params.postId)
    const post = await prisma.post.update({
        where: { 
            id: postId
        },
        data: {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id,
        }
    })
    res.status(200).send(post)
}

async function patch(req, res) {
    const postId = Number(req.params.postId)
    const post = await prisma.post.update({
        where: { 
            id: postId
        },
        data: {
            published: req.body.published,
        }
    })
    res.status(200).send(post)
}

async function del(req, res) {
    const postId = Number(req.params.postId)
    await prisma.post.delete({
        where: { 
            id: postId
        }
    })
    res.status(204).send()
}

async function getAll(req, res) {
    const posts = await prisma.post.findMany()
    res.status(200).send(posts)
}

const postController = {
    post,
    get,
    put,
    patch,
    del,
    getAll
}

export default postController