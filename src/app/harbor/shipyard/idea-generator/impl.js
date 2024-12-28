// import { useState, useEffect } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { init, generate } from './generator'
// import { Button, buttonVariants } from '@/components/ui/button'
// import Modal from '@/components/ui/modal'

// export function NewIdeaGenerator() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [result, setResult] = useState<string | null>(null)

//   useEffect(() => {
//     init()
//   }, [])

//   return (
//     <div className="mx-auto w-fit">
//       <Button onClick={() => setResult(generate())}>Generate an idea</Button>
//       <Modal isOpen={!!result} close={() => setResult(null)}>
//         <div
//         <Button onClick={() => setResult(generate())}>Regenerate</Button>
//         <p>{result}</p>
//       </Modal>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { Howl } from 'howler'
import { init, generate } from './generator'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
// import { sample } from '../../lib/flavor'

const thinkingSounds = [
  new Howl({ src: 'audio/yapping/thonk1.wav' }),
  new Howl({ src: 'audio/yapping/thonk2.wav' }),
  new Howl({ src: 'audio/yapping/thonk3.wav' }),
]

const yap_sounds = {
  // these sounds and most of the yapping code are adapted from https://github.com/equalo-official/animalese-generator
  a: new Howl({ src: 'audio/yapping/a.wav' }),
  b: new Howl({ src: 'audio/yapping/b.wav' }),
  c: new Howl({ src: 'audio/yapping/c.wav' }),
  d: new Howl({ src: 'audio/yapping/d.wav' }),
  e: new Howl({ src: 'audio/yapping/e.wav' }),
  f: new Howl({ src: 'audio/yapping/f.wav' }),
  g: new Howl({ src: 'audio/yapping/g.wav' }),
  h: new Howl({ src: 'audio/yapping/h.wav' }),
  i: new Howl({ src: 'audio/yapping/i.wav' }),
  j: new Howl({ src: 'audio/yapping/j.wav' }),
  k: new Howl({ src: 'audio/yapping/k.wav' }),
  l: new Howl({ src: 'audio/yapping/l.wav' }),
  m: new Howl({ src: 'audio/yapping/m.wav' }),
  n: new Howl({ src: 'audio/yapping/n.wav' }),
  o: new Howl({ src: 'audio/yapping/o.wav' }),
  p: new Howl({ src: 'audio/yapping/p.wav' }),
  q: new Howl({ src: 'audio/yapping/q.wav' }),
  r: new Howl({ src: 'audio/yapping/r.wav' }),
  s: new Howl({ src: 'audio/yapping/s.wav' }),
  t: new Howl({ src: 'audio/yapping/t.wav' }),
  u: new Howl({ src: 'audio/yapping/u.wav' }),
  v: new Howl({ src: 'audio/yapping/v.wav' }),
  w: new Howl({ src: 'audio/yapping/w.wav' }),
  x: new Howl({ src: 'audio/yapping/x.wav' }),
  y: new Howl({ src: 'audio/yapping/y.wav' }),
  z: new Howl({ src: 'audio/yapping/z.wav' }),
  th: new Howl({ src: 'audio/yapping/th.wav' }),
  sh: new Howl({ src: 'audio/yapping/sh.wav' }),
  _: new Howl({ src: 'audio/yapping/_.wav' }),
}

async function yap(
  text,
  {
    letterCallback = () => {},
    endCallback = () => {},
    baseRate = 10,
    rateVariance = 1,
  } = {},
) {
  const yap_queue = []
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const lowerChar = char?.toLowerCase()
    const prevChar = text[i - 1]
    const prevLowerChar = prevChar?.toLowerCase()
    const nextChar = text[i + 1]
    const nextLowerChar = nextChar?.toLowerCase()

    if (lowerChar === 's' && nextLowerChar === 'h') {
      // test for 'sh' sound
      yap_queue.push({ letter: char, sound: yap_sounds['sh'] })
      continue
    } else if (lowerChar === 't' && nextLowerChar === 'h') {
      // test for 'th' sound
      yap_queue.push({ letter: char, sound: yap_sounds['th'] })
      continue
    } else if (
      lowerChar === 'h' &&
      (prevLowerChar === 's' || prevLowerChar === 't')
    ) {
      // test if previous letter was 's' or 't' and current letter is 'h'
      yap_queue.push({ letter: char, sound: yap_sounds['_'] })
      continue
    } else if (',?. '.includes(char)) {
      yap_queue.push({ letter: char, sound: yap_sounds['_'] })
      continue
    } else if (lowerChar === prevLowerChar) {
      // skip repeat letters
      yap_queue.push({ letter: char, sound: yap_sounds['_'] })
      continue
    }

    if (lowerChar.match(/[a-z.]/)) {
      yap_queue.push({ letter: char, sound: yap_sounds[lowerChar] })
      continue // skip characters that are not letters or periods
    }

    yap_queue.push({ letter: char, sound: yap_sounds['_'] })
  }

  function next_yap() {
    if (yap_queue.length === 0) {
      console.log('yap done')
      endCallback()
      return
    }
    let { sound, letter } = yap_queue.shift()
    sound.rate(Math.random() * rateVariance + baseRate)
    sound.volume(1)
    sound.once('end', next_yap)
    sound.play()
    sound.once('play', () => {
      letterCallback({ sound, letter, length: yap_queue.length })
    })
  }

  next_yap()
}

const IdeaGenerator = () => {
  // const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    init()
  }, [])

  const thinkingWords = [
    'thinking',
    'single neuron activated',
    '2 braincells rubbing together',
    'ponderosourus',
    'contemplatosaurus',
    'dinosaur brain activated',
    'rummaging through my thoughts',
    'scrounging around the bottom of the barrel',
    'pirating new ideas',
    'plundering the depths of my mind',
    'thinking up a storm',
    'torrenting new ideas',
  ]

  const generateIdea = async () => {
    if (typing || loading) return

    setLoading(true)
    // setMessage(sample(thinkingWords))
    // sample(thinkingSounds).play()

    let newIdea = ''

    try {
      // await Promise.all([
      //   fetchIdea().then((i) => {
      //     newIdea = i.idea
      //   }),
      //   new Promise((resolve) => setTimeout(resolve, 2000)),
      // ])
      const newIdea = generate()

      setTyping(true)
      setLoading(false)
      setMessage('')

      yap(newIdea, {
        letterCallback: ({ letter }) => {
          setMessage((prev) => prev + letter)
        },
        endCallback: () => {
          setTyping(false)
        },
      })
    } catch (error) {
      console.error('Error generating idea:', error)
      setLoading(false)
    }
  }

  const activeClass = loading ? 'thinking' : typing ? 'typing' : 'idle'
  const imgSrc = loading
    ? '/thinking.png'
    : typing
      ? '/talking.png'
      : '/idle.png'

  return (
    <>
      <Button onClick={generateIdea}>Generate an idea</Button>
      <Modal isOpen={!!message} close={() => setMessage(null)}>
        <div className="flex flex-col items-center">
          <p className="max-w-prose text-lg">{message}</p>
          <img
            src={imgSrc}
            className={`mb-12 max-w-1/2 ${activeClass} ${
              loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            alt="idea generator"
            onClick={loading ? null : generateIdea}
            style={{ pointerEvents: loading ? 'none' : 'auto' }}
          />
          <Button onClick={loading ? null : generateIdea}>Regenerate</Button>
        </div>
      </Modal>
    </>
  )
}

export { IdeaGenerator }
