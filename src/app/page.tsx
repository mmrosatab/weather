'use client'

import { useState } from 'react'
import { getWeatherByCity, WeatherApiResponse } from './service'
import { WeatherCard } from './components'

export interface WeatherData {
  name: string
  temp: number
  feelsLike: number
  tempMin: number
  tempMax: number
  pressure: number
  humidity: number
  country: string
  description: string
  icon: string
}

export default function Home() {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [notFoundMessage, setNotFoundMessage] = useState<{ message: string } | null>(null)

  const fetchWeatherData = async () => {
    setWeatherData(null)
    setNotFoundMessage(null)

    if (city.trim().length === 0) return

    try {
      const data = await getWeatherByCity(city)

      if (data) {
        const formattedData = formatWeatherData(data)
        setWeatherData(formattedData)
      } else {
        setNotFoundMessage({ message: `No results for ${city}` })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setCity('')
    }
  }

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWeatherData()
    }
  }

  const handleClick = async () => {
    fetchWeatherData()
  }

  const formatWeatherData = (data: WeatherApiResponse): WeatherData => {
    const { name, sys, main, weather } = (data)
    const { country } = sys
    const { description, icon } = weather[0]
    const {
      temp,
      feelsLike,
      tempMin,
      tempMax,
      pressure,
      humidity,
    } = main


    return {
      name,
      country,
      description,
      temp: Math.ceil(temp),
      feelsLike: Math.ceil(feelsLike),
      tempMin,
      tempMax,
      pressure,
      humidity,
      icon
    }
  }

  return (
    <div className="flex-col justify-items-center">
      <header className="w-6/12 flex justify-center p-4 text-2xl">
        <h1>Weather</h1>
      </header>
      <div className="relative w-1/4 h-10 rounded-lg">
        <button
          type="button"
          onClick={handleClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff"
            className="size-6 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <input className="rounded-lg focus:outline-none w-full bg-blue-400 h-10 p-4 text-white placeholder:italic placeholder:text-white"
          type="text"
          aria-label="Search for a city"
          placeholder="Search for a city..."
          onKeyDown={(e) => handlePressEnter(e)}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="w-1/4 mt-4">
        {weatherData && (
          <WeatherCard {...weatherData} />
        )}

        {notFoundMessage && (
          <WeatherCard {...notFoundMessage} />
        )}
      </div>
    </div>
  )
}
