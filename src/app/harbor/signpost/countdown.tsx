import { useState, useEffect } from 'react'
import JaggedCardSmall from '@/components/jagged-card-small'

const dateEnd = new Date('2025-01-31').getTime()
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('00:00:00')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = dateEnd - now

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft('00:00:00')
        return
      }

      const hours = Math.floor(distance / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <JaggedCardSmall bgColor="#efefef" shadow={true} className="text-white">
      <div className="text-center">
        <h2 className="text-xl">Time Remaining</h2>
        <h1 className="text-4xl font-bold">{timeLeft}</h1>
      </div>
    </JaggedCardSmall>
  )
}
