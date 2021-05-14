import express from 'express'
import webRouter from './routers/web.mjs'
import stockRouter from './routers/stock.mjs'

const app = express()

app.use(webRouter)
app.use(stockRouter)

export default app