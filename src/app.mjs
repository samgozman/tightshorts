import express from 'express'
import { create } from 'express-handlebars'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import csurf from 'csurf'
import webRouter from './routers/web.mjs'
import stockRouter from './routers/stock.mjs'
import screenerRouter from './routers/screener.mjs'
import helmet from 'helmet'

const csrf = csurf({
    cookie: {
        httpOnly: true,
        secure: true
    }
})

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const hbs = create({
    extname: 'hbs',
    partialsDir: __dirname + '/../web/views/partials',
    layoutsDir: __dirname + '/../web/views/layouts',
})

const app = express()

// Register `hbs.engine` with the Express app.
app.set('views', __dirname + '/../web/views')
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// Set cookie
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(cookieSession({
    secret: process.env.COOKIE_SESSION_KEY
}))

// Block Cross-site request forgery
app.use(csrf)
app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.locals.token = req.csrfToken()
    next()
})

app.use(helmet({
    contentSecurityPolicy: false,
}))

app.use(webRouter)
app.use(stockRouter)
app.use(screenerRouter)

export default app