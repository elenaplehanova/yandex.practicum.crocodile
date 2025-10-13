import React, { useEffect, useState } from 'react'
import { useGeoLocation } from '@hooks/useGeolocation'
import s from './GetLocation.module.scss'

const GetLocation = () => {
  const { latitude, longitude, country } = useGeoLocation()

  return (
    <div className={s.container}>
      Latitude: {latitude}
      <br />
      Longitude: {longitude}
      <br />
      Country: {country}
    </div>
  )
}

export default GetLocation
