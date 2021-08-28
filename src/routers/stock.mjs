import express from 'express'
import axios from 'axios'
import {
    query
} from 'express-validator'

const stockRouter = new express.Router()

// root index page
stockRouter.post('/stock',
    query('ticker').toUpperCase().whitelist('ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789'),
    async (req, res) => {
        try {
            const ticker = req.query.ticker
            const config = {
                method: 'get',
                url: `${process.env.API_URL}/stock?ticker=${ticker}`,
                headers: {
                    'token': process.env.API_KEY,
                    'Content-Type': 'application/json'
                }
            }

            const api = (await axios(config)).data

            res.send(api)
        } catch (error) {
            res.status(404).send(error)
        }

    })
export default stockRouter