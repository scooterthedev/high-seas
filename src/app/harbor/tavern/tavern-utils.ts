'use server'

import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: process.env.AIRTABLE_ENDPOINT_URL,
})

type RsvpStatus = 'none' | 'organizer' | 'participant'
export type TavernPersonItem = {
  id: string
  status: RsvpStatus
  coordinates: string
}
export type TavernEventItem = {
  id: string
  city: string
  geocode: string
  organizers: string[]
}

let cachedPeople: TavernPersonItem[] | null,
  cachedEvents: TavernEventItem[] | null
let lastPeopleFetch = 0,
  lastEventsFetch = 0
const TTL = 30 * 60 * 1000

export const getTavernPeople = async () => {
  if (Date.now() - lastPeopleFetch < TTL) return cachedPeople

  console.log('Fetching tavern people')
  lastPeopleFetch = Date.now()
  const base = Airtable.base(process.env.BASE_ID!)
  const records = await base('people')
    .select({
      fields: ['tavern_rsvp_status', 'tavern_map_coordinates'],
      filterByFormula:
        'AND({tavern_map_coordinates} != "", OR(tavern_rsvp_status != "", shipped_ship_count >= 1))',
    })
    .all()

  return records.map((r) => ({
    id: r.id,
    status: r.get('tavern_rsvp_status'),
    coordinates: r.get('tavern_map_coordinates'),
  })) as TavernPersonItem[]
}

export const getTavernEvents = async () => {
  if (Date.now() - lastEventsFetch < TTL) return cachedEvents

  console.log('Fetching tavern events')
  lastEventsFetch = Date.now()
  const base = Airtable.base(process.env.BASE_ID!)
  const records = await base('taverns')
    .select({
      fields: ['city', 'map_geocode', 'organizers'],
    })
    .all()

  return records.map((r) => ({
    id: r.id,
    city: r.get('city'),
    geocode: r.get('map_geocode'),
    organizers: r.get('organizers') ?? [],
  })) as TavernEventItem[]
}
