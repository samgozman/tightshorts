import express from 'express'
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

// Setup static directory to serve
webRouter.use(express.static(public_dir, {
    dotfiles: 'allow'
}))

// root index page
webRouter.get('', (req, res) => {
    return res.render('index', {
        layout: 'tightshorts-ui',
        title: 'Tight Shorts',
        version: process.env.npm_package_version,
        ticker: 'undefined',
        csrf: req.csrfToken()
    })
})

// Stock personal page
webRouter.get('/quote/:ticker',
    param('ticker').toUpperCase().whitelist('ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789'),
    (req, res) => {
        return res.render('index', {
            layout: 'tightshorts-ui',
            title: 'Tight Shorts',
            version: process.env.npm_package_version,
            ticker: req.params.ticker,
            csrf: req.csrfToken()
        })
    })

// root index page
webRouter.get('/screener', (req, res) => {
    return res.render('screener', {
            layout: 'screener-ui',
            title: 'Tight Shorts: Screener',
            version: process.env.npm_package_version,
            csrf: req.csrfToken()
        })
})


export default webRouter