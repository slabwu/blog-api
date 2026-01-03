import fs from 'fs'
import path from 'path'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { prisma } from './prisma.js'

const pathToKey = path.join(import.meta.dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const strategy = new Strategy(options, async (payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.sub
                }
            })

            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            done(err, null)
        }
})

export default function configurePassport(passport) {
    passport.use(strategy)
}