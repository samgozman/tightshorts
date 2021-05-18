import app from './app.mjs'
import https from 'https'
import fs from 'fs'

const port = process.env.PORT

if (process.env.NODE_ENV === 'production') {
    https.createServer({
            key: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/cert.pem'),
            ca: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/chain.pem'),
        },
        app).listen(443, () => {
        console.log('Server is up on port 443')
    })
}

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})