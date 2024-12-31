import axios from 'axios'

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
    const { data } = await axios.get('/api/weather', { params: { city } })
    return data
}