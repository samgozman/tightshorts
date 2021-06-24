import app from './app.mjs'
import http from 'http'
import https from 'https'
import fs from 'fs'
import isURL from 'validator/lib/isURL.js'

const port = process.env.PORT

if (process.env.NODE_ENV === 'production') {
    https.createServer({
            key: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/cert.pem'),
            ca: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/chain.pem'),
        },
        app).listen(443, () => {
        console.log('Prod server is up on port 443')
    })

    // Redirect from 80 to 443
    http.createServer(function (req, res) {
        const link = 'https://' + req.headers['host'] + req.url
        if (isURL(link)) {
            res.writeHead(301, {
                'Location': link
            })
            res.end()
        }
    }).listen(80)
} else {
    app.listen(port, () => {
        console.log('Dev server is up on port ' + port)
    })
}