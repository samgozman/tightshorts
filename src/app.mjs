import express from 'express'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import csurf from 'csurf'
import webRouter from './routers/web.mjs'
import stockRouter from './routers/stock.mjs'
import helmet from 'helmet'

const csrf = csurf({
    cookie: true
})

const app = express()
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

export default app