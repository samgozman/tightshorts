import express from 'express'
import fs from 'fs'
import {
    join
} from 'path'
import {
    fileURLToPath
} from 'url'
import {
    param
} from 'express-validator'

const webRouter = new express.Router()

const __dirname = fileURLToPath(new URL('.',
    import.meta.url))
const public_dir = join(__dirname, '../../dist')

const setCSRFandVersion = (page, req, ticker) => {
    // Save csrf token in the meta
    let file = fs.readFileSync(join(public_dir, page), 'utf8')
    file = file.replace('{{ csrf }}', req.csrfToken())
    // App version
    file = file.replace('{{ version }}', process.env.npm_package_version)
    // Stock meta
    file = file.replace('{{ ticker }}', ticker || 'AAPL')
    return file
}

// Setup static directory to serve
webRouter.use(express.static(public_dir, {
    dotfiles: 'allow'
}))

// root index page
webRouter.get('', (req, res) => {
    return res.send(setCSRFandVersion('/main.html', req))
})

// Stock personal page
webRouter.get('/:ticker',
    param('ticker').toUpperCase().whitelist('ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789'),
    (req, res) => {
        const ticker = req.params.ticker
        return res.send(setCSRFandVersion('/main.html', req, ticker))
    })

export default webRouter