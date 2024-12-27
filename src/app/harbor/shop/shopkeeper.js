import { useState } from 'react'

import { Howl } from 'howler'
import { yap } from '../../../../lib/yap'
import {
  shopGreetings,
  shopNoMoney,
  shopGetOut,
  shopCursed,
  shopHelp,
  sample,
  shopIcons,
  tooManyBells,
  shopSelfClick,
} from '../../../../lib/flavor'

const bellSoundUrls = [
  'https://cloud-dx9y4rk8f-hack-club-bot.vercel.app/0ding-2-90199_audio.mp4',
  'https://cloud-dx9y4rk8f-hack-club-bot.vercel.app/1ding-3-90200_audio.mp4',
  'https://cloud-dx9y4rk8f-hack-club-bot.vercel.app/2ding-1-106698_audio.mp4',
  'https://cloud-dx9y4rk8f-hack-club-bot.vercel.app/3service-bell-ring-14610_audio.mp4',
  'https://cloud-dx9y4rk8f-hack-club-bot.vercel.app/4bell-98033_audio.mp4',
]
const bellSounds = bellSoundUrls.map((url) => new Howl({ src: [url] }))

export const ShopkeeperComponent = ({ balance, cursed }) => {
  const [atCounter, setAtCounter] = useState(false)
  const [bellIndex, setBellIndex] = useState(0)
  const [bellClickCount, setBellClickCount] = useState(0)
  const [continuousBellClicks, setContinuousBellClicks] = useState(0)
  const [shopkeeperMsg, setShopkeeperMsg] = useState('')
  const [shopkeeperImg, setShopkeeperImg] = useState('thinking.png')
  const [interactionBusy, setInteractionBusy] = useState(false)

  const handleInteraction = async (interaction) => {
    console.log({interactionBusy})
    if (interactionBusy) { return }
    console.log({ interactionBusy })
    if (interactionBusy) {
      return
    }
    setInteractionBusy(true)
    setShopkeeperMsg('')
    for (const action of interaction.split('|')) {
      const [verb, ...arg] = action.split(':')
      console.log('processing', verb, arg)
      switch (verb) {
        case 'icon':
          await setShopkeeperImg(shopIcons[arg] || arg)
          break
        default:
          // in the future this will be replaced with speaking & sound logic
          await new Promise((resolve) => {
            yap(verb, {
              letterCallback: ({ letter }) =>
                setShopkeeperMsg((s) => s + letter),
              endCallback: resolve,
            })
          })
          // await yap(verb, {
          //   letterCallback: ({ letter }) => setShopkeeperMsg((s) => s + letter),
          // })
          break
      }
    }
    setInteractionBusy(false)
  }

  const handleServiceBellClick = async () => {
    setBellIndex(Math.floor(Math.random() * bellSounds.length))
    setBellClickCount(bellClickCount + 1)
    setContinuousBellClicks(continuousBellClicks + 1)
    bellSounds[bellIndex].play()
    setAtCounter(true)
    // await new Promise(r => setTimeout(r, 1000))
    if (continuousBellClicks > 5) {
      await handleInteraction(sample(tooManyBells))
    } else if (cursed) {
      await handleInteraction(
        sample(shopGreetings) +
          ' ' +
          sample(shopCursed) +
          ' ' +
          sample(shopGetOut),
      )
    } else if (balance == 0) {
      await handleInteraction(
        sample(shopGreetings) +
          ' ' +
          sample(shopNoMoney) +
          ' ' +
          sample(shopGetOut),
      )
      // setAtCounter(false)
    } else if (continuousBellClicks > 1) {
      await handleInteraction(sample(shopHelp))
    } else {
      await handleInteraction(sample(shopGreetings))
    }
  }

  const handleSelfClick = async () => {
    await handleInteraction(sample(shopSelfClick))
  }

  const containerStyles = {
    zIndex: 999, // over the page, under the sound-button
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    color: 'white',
    border: '1px solid red',
  }

  const innerPaddingStyles = {
    margin: '0 auto',
    maxWidth: '32em',
    display: 'flex',
    flexDirection: 'row',
    background: 'rgba(0,0,0,0.3)',
  }

  const imgStyles = {
    maxWidth: '10em',
  }

  return (
    <>
      <div className="cursor-pointer" onClick={handleServiceBellClick}>
        🛎️
      </div>
      <div>(ring for service)</div>

      <style jsx>
        {`
          @keyframes talking {
            from {
              transform: scale(1.01, 0.99) translateY(2%);
            }
            to {
              transform: scale(0.99, 1.01) translateY(0%);
            }
          }

          @keyframes idle {
            from {
              transform: translateY(0%);
            }
            to {
              transform: translateY(2%);
            }
          }

          .shopkeeper-idling {
            animation: idle 2s infinite alternate;
            filter: contrast(60%);
          }

          .shopkeeper-talking {
            animation: talking 0.2s infinite alternate;
            filter: contrast(100%);
          }
        `}
      </style>

      {atCounter && (
        <div style={containerStyles}>
          <div style={innerPaddingStyles}>
            <div id="shopkeeper-img">
              <img
                src={shopkeeperImg}
                style={imgStyles}
                onClick={handleSelfClick}
                className={
                  interactionBusy ? 'shopkeeper-talking' : 'shopkeeper-idling'
                }
              />
            </div>
            <div id="shopkeeper-msg">{shopkeeperMsg}</div>
          </div>
        </div>
      )}
    </>
  )
}
