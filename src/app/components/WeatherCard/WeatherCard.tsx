import Image from 'next/image'

interface WeatherData {
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

type CardProps = WeatherData | { message: string }

export function WeatherCard(props: CardProps) {
    if ('message' in props) {
        return (
            <div className="flex justify-center w-full italic">
                <div>{props.message}</div>
            </div>
        )
    } else {
        return (
            <div className="bg-blue-400 w-full text-white italic rounded-lg p-4">
                <div className="flex items-center">
                    <Image
                        src={`https://openweathermap.org/img/wn/${props.icon}.png`}
                        alt={props.description}
                        width={50}
                        height={50}
                    />
                    <h2 className="ml-1">{props.name}, {props.country}</h2>
                </div>
                <p>Description: {props.description}</p>
                <p>Temperature: {props.temp}°C</p>
                <p>Feels Like: {props.feelsLike}°C</p>
                <p>Min Temperature: {props.tempMin}°C</p>
                <p>Max Temperature: {props.tempMax}°C</p>
                <p>Pressure: {props.pressure} hPa</p>
                <p>Humidity: {props.humidity}%</p>
            </div>
        )
    }
}