const Shopkeeper = () => {
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
    margin: "0 auto",
    maxWidth: '32em',
    display: 'flex',
    flexDirection: 'row',
    background: 'rgba(0,0,0,0.3)'
  }

  const imgStyles = {
    maxWidth: '10em'
  }
  return (
    <div style={containerStyles}>
      <div style={innerPaddingStyles}>
        <div id="shopkeeper-img">
          <img src="thinking.png" style={imgStyles} />
        </div>
        <div id="shopkeeper-msg">
          Hello!
        </div>
      </div>
    </div>
  )
}

export { Shopkeeper }