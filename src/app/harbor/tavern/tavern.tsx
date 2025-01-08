'use client'

import { useEffect } from 'react'
import useLocalStorageState from '../../../../lib/useLocalStorageState'
import { setTavernRsvpStatus, getTavernRsvpStatus } from '@/app/utils/tavern'

const RsvpStatusSwitcher = () => {
  const [rsvpStatus, setRsvpStatus] = useLocalStorageState(
    'cache.rsvpStatus',
    'none',
  )

  useEffect(() => {
    // set rsvp status
    getTavernRsvpStatus().then((status) => setRsvpStatus(status))
  }, [])

  const onOptionChangeHandler = (e) => {
    setRsvpStatus(e.target.value)
    setTavernRsvpStatus(e.target.value)
  }

  return (
    <div className="text-center mb-6 mt-12" id="region-select">
      <label>Will you join?</label>
      <select
        onChange={onOptionChangeHandler}
        value={rsvpStatus}
        className="ml-2 text-gray-600 rounded-sm"
      >
        <option disabled>Select</option>
        <option value="none">Nope, can't do neither</option>
        <option value="organizer">I can organize a tavern near me</option>
        <option value="participant">I want to attend a tavern near me</option>
      </select>
    </div>
  )
}

export default function Tavern() {
  return (
    <div className="container mx-auto px-4 py-8 text-white relative">
      <div className="text-center text-white">
        <h1 className="font-heading text-5xl mb-6 text-center relative w-fit mx-auto">
          Mystic Tavern
        </h1>

        <RsvpStatusSwitcher />
      </div>
    </div>
  )
}
