import React, { useEffect, useState } from 'react'
import { GEO_API_KEY } from '../constants'

export const useGeoLocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [ip, setIp] = useState<string | null>(null)

  useEffect(() => {
    const getCountryFromIp = async (ip: string) => {
      const response = await fetch(
        `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${GEO_API_KEY}&ip=${ip}`
      )
      const data = await response.json()
      setCountry(data.location.country_name)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
              setIp(data.ip)
              getCountryFromIp(data.ip)
            })
        },
        error => {
          console.error(error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  return {
    latitude,
    longitude,
    country,
    ip,
  }
}
