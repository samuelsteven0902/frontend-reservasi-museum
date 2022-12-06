import React from 'react'
import { GoogleMap , useLoadScript , Marker } from '@react-google-maps/api'

function Map() {
    const { isLoaded } = useLoadScript({googleMapApiKey: "AIzaSyBH5M45Zr1BvnlFXxTxvj3cbgYkF6ei98I"})
  
  if(!isLoaded) return <div>Loading...</div>
    return (
    <GoogleMap zoom={17} center={{lat:-7.5689431021995865,lng: 110.81081756648952}} mapContainerClassName="w-full h-full" >
      <Marker position={{lat:-7.5689431021995865,lng: 110.81081756648952}}/>
    </GoogleMap>
  )
}

export default Map