import express from 'express'
import fs from 'fs'
import {
    join
} from 'path'
import {
    fileURLToPath
} from 'url'

const webRouter = new express.Router()

const __dirname = fileURLToPath(new URL('.',
    import.meta.url))
const public_dir = join(__dirname, '../../dist')

// Setup static directory to serve
webRouter.use(express.static(public_dir, {
    dotfiles: 'allow'
}))

// root index page
webRouter.get('', (req, res) => {
    // Save csrf token in the meta
    let file = fs.readFileSync(join(public_dir, '/main.html'), 'utf8')
    file = file.replace('{{ csrf }}', req.csrfToken())
    // App version
    file = file.replace('{{ version }}', process.env.npm_package_version)
    res.send(file)
})

export default webRouter