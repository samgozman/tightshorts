import express from 'express'
import axios from 'axios'

const stockRouter = new express.Router()

// root index page
stockRouter.get('/stock', async (req, res) => {
    try {
        const ticker = req.query.ticker
        const config = {
            method: 'get',
            url: `${process.env.API_URL}/stock?ticker=${ticker}`,
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            }
        }

        const api = (await axios(config)).data

        res.send(api)
    } catch (error) {
        res.status(404).send('Stock is not found!')
    }

})

export default stockRouter