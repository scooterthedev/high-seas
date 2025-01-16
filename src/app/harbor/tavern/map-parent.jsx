'use client'

import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./map'), {
  ssr: false,
})

export default function MapParent(props) {
  return <DynamicMap {...props} />
}
