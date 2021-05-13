import express from 'express'
import webRouter from './routers/web.mjs'

const app = express()

app.use(webRouter)
export default app