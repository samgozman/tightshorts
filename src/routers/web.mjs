import express from 'express'
import { join } from 'path'
import { fileURLToPath } from 'url'

const webRouter = new express.Router()

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const public_dir = join(__dirname, '../../public')

// Setup static directory to serve
webRouter.use(express.static(public_dir))

// root index page
webRouter.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/index.html'))
})

export default webRouter