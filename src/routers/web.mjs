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
        isMain: true,
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
            isMain: true,
            version: process.env.npm_package_version,
            ticker: req.params.ticker,
            csrf: req.csrfToken()
        })
    })

// root index page
webRouter.get('/screener', (req, res) => {
    return res.render('screener', {
        layout: 'screener-ui',
        isScreener: true,
        title: 'Tight Shorts: Screener',
        version: process.env.npm_package_version,
        csrf: req.csrfToken(),
        filters: {
            settings: {
                onTinkoff: {
                    title: 'Available on Tinkoff broker',
                    iconClass: 'extension-puzzle-outline'
                },
                isNotGarbage: {
                    title: 'Is not complete garbage',
                    iconClass: 'trash-bin-outline'
                }
            },
            sequence3D: {
                shortVolGrows3D: {
                    title: 'Short volume up 3d',
                    iconClass: 'trending-up-outline'
                },
                shortVolDecreases3D: {
                    title: 'Short volume down 3d',
                    iconClass: 'trending-down-outline'
                },
                shortVolRatioGrows3D: {
                    title: 'Short volume %% up 3d',
                    iconClass: 'trending-up-outline'
                },
                shortVoRatiolDecreases3D: {
                    title: 'Short volume %% down 3d',
                    iconClass: 'trending-down-outline'
                },
                totalVolGrows3D: {
                    title: 'Total volume up 3d',
                    iconClass: 'trending-up-outline'
                },
                totalVolDecreases3D: {
                    title: 'Total volume down 3d',
                    iconClass: 'trending-down-outline'
                },
                shortExemptVolGrows3D: {
                    title: 'Short exempt volume up 3d',
                    iconClass: 'trending-up-outline'
                },
                shortExemptVolDecreases3D: {
                    title: 'Short exempt volume down 3d',
                    iconClass: 'trending-down-outline'
                },
                shortExemptVolRatioGrows3D: {
                    title: 'Short exempt volume %% up 3d',
                    iconClass: 'trending-up-outline'
                },
                shortExemptVolRatioDecreases3D: {
                    title: 'Short exempt volume %% down 3d',
                    iconClass: 'trending-down-outline'
                }
            },
            sequence5D: {
                shortVolGrows5D: {
                    title: 'Short volume up 5d',
                    iconClass: 'trending-up-outline'
                },
                shortVolDecreases5D: {
                    title: 'Short volume down 5d',
                    iconClass: 'trending-down-outline'
                },
                shortVolRatioGrows5D: {
                    title: 'Short volume %% up 5d',
                    iconClass: 'trending-up-outline'
                },
                shortVoRatiolDecreases5D: {
                    title: 'Short volume %% down 5d',
                    iconClass: 'trending-down-outline'
                },
                totalVolGrows5D: {
                    title: 'Total volume up 5d',
                    iconClass: 'trending-up-outline'
                },
                totalVolDecreases5D: {
                    title: 'Total volume down 5d',
                    iconClass: 'trending-down-outline'
                },
                shortExemptVolGrows5D: {
                    title: 'Short exempt volume up 5d',
                    iconClass: 'trending-up-outline'
                },
                shortExemptVolDecreases5D: {
                    title: 'Short exempt volume down 5d',
                    iconClass: 'trending-down-outline'
                },
                shortExemptVolRatioGrows5D: {
                    title: 'Short exempt volume %% up 5d',
                    iconClass: 'trending-up-outline'
                },
                shortExemptVolRatioDecreases5D: {
                    title: 'Short exempt volume %% down 5d',
                    iconClass: 'trending-down-outline'
                }
            }
        }
    })
})


export default webRouter