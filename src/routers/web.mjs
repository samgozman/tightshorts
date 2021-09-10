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
                shortVol3D: {
                    title: 'Short volume 3d',
                    upId: 'shortVolGrows3D',
                    downId: 'shortVolDecreases3D'
                },
                shortVolRatio3D: {
                    title: 'Short volume %% 3d',
                    upId: 'shortVolRatioGrows3D',
                    downId: 'shortVoRatiolDecreases3D'
                },
                totalVol3D: {
                    title: 'Total volume 3d',
                    upId: 'totalVolGrows3D',
                    downId: 'totalVolDecreases3D'
                },
                shortExemptVol3D: {
                    title: 'Short exempt volume 3d',
                    upId: 'shortExemptVolGrows3D',
                    downId: 'shortExemptVolDecreases3D'
                },
                shortExemptVolRatio3D: {
                    title: 'Short exempt volume %% 3d',
                    upId: 'shortExemptVolRatioGrows3D',
                    downId: 'shortExemptVolRatioDecreases3D'
                }
            },
            sequence5D: {
                shortVol5D: {
                    title: 'Short volume 5d',
                    upId: 'shortVolGrows5D',
                    downId: 'shortVolDecreases5D'
                },
                shortVolRatio5D: {
                    title: 'Short volume %% 5d',
                    upId: 'shortVolRatioGrows5D',
                    downId: 'shortVoRatiolDecreases5D'
                },
                totalVol5D: {
                    title: 'Total volume 5d',
                    upId: 'totalVolGrows5D',
                    downId: 'totalVolDecreases5D'
                },
                shortExemptVol5D: {
                    title: 'Short exempt volume 5d',
                    upId: 'shortExemptVolGrows5D',
                    downId: 'shortExemptVolDecreases5D'
                },
                shortExemptVolRatio5D: {
                    title: 'Short exempt volume %% 5d',
                    upId: 'shortExemptVolRatioGrows5D',
                    downId: 'shortExemptVolRatioDecreases5D'
                }
            },
            abnormal: {
                abnormalShortlVol: {
                    title: 'x3 short volume',
                    upId: 'abnormalShortlVolGrows',
                    downId: 'abnormalShortVolDecreases'
                },
                abnormalTotalVol: {
                    title: 'x3 total volume',
                    upId: 'abnormalTotalVolGrows',
                    downId: 'abnormalTotalVolDecreases'
                },
                abnormalShortExemptVol: {
                    title: 'x3 short exempt volume',
                    upId: 'abnormalShortExemptVolGrows',
                    downId: 'abnormalShortExemptVolDecreases'
                },
            },
        }
    })
})


export default webRouter