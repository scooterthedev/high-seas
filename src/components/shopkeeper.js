import { useEffect, useRef, useState } from 'react'

const Shopkeeper = ({ interaction }) => {
  const [shopkeeperImg, setShopkeeperImg] = useState('thinking.png')
  const [shopkeeperMsg, setShopkeeperMsg] = useState('start')

  const setMsgRef = useRef(setShopkeeperMsg)

  const shopkeeperHandler = function (e) {
    console.log('shopkeeper handling:', e)
    console.log(setMsgRef.current)
    // setMsgRef.current.
  }

  useEffect(() => {
    if (window && !window.shopkeeper) {
      window.shopkeeper = shopkeeperHandler
    }
  }, [])

  const containerStyles = {
    zIndex: 999, // over the page, under the sound-button
    position: 'fixed',
    bottom: 0,
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
  return null
  return (
    <div style={containerStyles}>
      <div style={innerPaddingStyles}>
        <div id="shopkeeper-img">
          <img src={shopkeeperImg} style={imgStyles} />
        </div>
        <div id="shopkeeper-msg">{shopkeeperMsg}</div>
      </div>
    </div>
  )
}

export { Shopkeeper }
