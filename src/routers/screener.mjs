import express from 'express'
import axios from 'axios'
import {
    query
} from 'express-validator'

const screenerRouter = new express.Router()

// root index page
screenerRouter.post('/screener/filter',
    query('ticker').toUpperCase().whitelist('ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789'),
    async (req, res) => {
        const limit = req.query.limit || ''
        const skip = req.query.skip || ''
        const sort = req.query.sort || ''
        const filters = decodeURI(req.query.filters) || ''
        try {
            // const ticker = req.query.ticker
            const config = {
                method: 'get',
                url: `${process.env.API_URL}/filter?limit=${limit}&skip=${skip}&sort=${sort}&filters=${filters}`,
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }

            const api = (await axios(config)).data

            res.send(api)
        } catch (error) {
            res.status(404).send(error)
        }

    })
export default screenerRouter