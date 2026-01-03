import passport from 'passport'
import { validPassword, genPassword, issueJWT } from '../lib/utils.js'
import { prisma } from '../lib/prisma.js'

async function postLogIn(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (!user) return res.status(401).json({ success: false, msg: "Could not find user" })
    const isValid = validPassword(req.body.password, user.hash, user.salt)

    if (isValid) {
        const tokenObject = issueJWT(user)
        res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires })
    } else {
        res.status(401).json({ success: false, msg: "Password incorrect" })
    }
}

async function postSignUp(req, res) {
    const { hash, salt } = genPassword(req.body.password)
    const user = await prisma.user.create({
        data: { 
            username: req.body.username,
            hash,
            salt
         }
    })

    const jwt = issueJWT(user)

    res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })
}

async function getProtected(req, res) {
    res.status(200).json({ success: true, msg: 'You are authorised'})
}

const authController = {
    postLogIn,
    postSignUp,
    getProtected
}

export default authController
export const auth = passport.authenticate('jwt', {session: false})