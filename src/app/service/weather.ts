import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const APPID = process.env.NEXT_PUBLIC_APPID

export interface WeatherApiResponse {
    name: string
    main: {
        temp: number
        feelsLike: number
        tempMin: number
        tempMax: number
        pressure: number
        humidity: number
    }
    sys: {
        country: string
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
}


export const getWeatherByCity = async (city: string): Promise<WeatherApiResponse | null> => {
    const { data } = await axios.get(`${BASE_URL}/find?q=${city}&appid=${APPID}&units=metric`)
    if (data && data.list.length > 0) {
        return camelcaseKeys(data.list[0], { deep: true })
    }

    return null
}