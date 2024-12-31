import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city } = req.query

    if (!city) {
        return res.status(400).json({ error: 'City is required' })
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/find`, {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric',
            },
        })

        if (!data.list || data.list.length === 0) {
            return res.status(404).json({ error: `No results found for city: ${city}` })
        }

        return res.status(200).json(camelcaseKeys(data.list[0], { deep: true }))
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to fetch weather data' })
    }
}