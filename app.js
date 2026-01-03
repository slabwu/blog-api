import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import routes from './routes/index.js'
import configurePassport from './lib/passport.js'

const app = express()
configurePassport(passport)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(import.meta.dirname, 'public')))

app.use('/', routes)

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
})