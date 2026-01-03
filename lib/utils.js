import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const pathToKey = path.join(import.meta.dirname, '..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

export function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex')
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
      salt,
      hash
    }
}

export function issueJWT(user) {
  const id = user.id

  const expiresIn = '1d'

  const payload = {
    sub: id,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}