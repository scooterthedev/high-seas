'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  getTavernPeople,
  getTavernEvents,
  type TavernPersonItem,
  type TavernEventItem,
} from './tavern-utils'
import { type LatLngExpression, DivIcon, Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet'

const MAP_ZOOM = 11,
  MAP_CENTRE: LatLngExpression = [0, 0]

export default function Map() {
  const [tavernPeople, setTavernPeople] = useState<TavernPersonItem[]>([])
  const [tavernEvents, setTavernEvents] = useState<TavernEventItem[]>([])

  useEffect(() => {
    Promise.all([getTavernPeople(), getTavernEvents()]).then(([tp, te]) => {
      setTavernPeople(tp)
      setTavernEvents(te)
    })
  }, [])

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>

      <MapContainer center={MAP_CENTRE} zoom={MAP_ZOOM} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <TavernMarkers people={tavernPeople} events={tavernEvents} />
        <UserLocation />
      </MapContainer>
    </div>
  )
}

function UserLocation() {
  const map = useMap()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        if (map !== null) {
          map.setView([loc.coords.latitude, loc.coords.longitude], 11)
        }
      })
    }
  }, [map])

  return null
}

function TavernMarkers(props: MapProps) {
  const map = useMap()

  if (!map) return null

  const peopleMarkers = props.people.map((t) => {
    const iconClass = `tavern-marker tavern-${!t.status ? 'default' : t.status}`

    const icon = new DivIcon({
      className: iconClass,
      iconSize: [25, 25],
    })

    return (
      <Marker
        key={t.id}
        position={
          t.coordinates.split(', ').map((c) => Number(c)) as LatLngExpression
        }
        icon={icon}
      />
    )
  })
  const eventMarkers = props.events
    .map((e) => {
      let iconUrl
      if (e.organizers.length === 0) {
        iconUrl = '/handraise.png'
      } else {
        iconUrl = '/tavern.png'
      }

      const icon = new Icon({
        iconUrl,
        iconSize: [50, 50],
      })

      const geocodeObj = JSON.parse(atob(e.geocode.slice(2).trim()))

      if (geocodeObj.o.status !== 'OK') {
        return null
      }

      return (
        <Marker
          key={e.id}
          position={[geocodeObj.o.lat, geocodeObj.o.lng]}
          icon={icon}
          zIndexOffset={20}
        >
          <Tooltip>{e.city}</Tooltip>
        </Marker>
      )
    })
    .filter((e) => e !== null)

  return [...peopleMarkers, ...eventMarkers]
}

type MapProps = {
  people: TavernPersonItem[]
  events: TavernEventItem[]
}
