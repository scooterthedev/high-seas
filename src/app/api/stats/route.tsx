import Airtable from 'airtable'
import { ImageResponse } from 'next/og'
import { kv } from '@vercel/kv'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.BASE_ID!,
)

export async function GET({ url }) {
  let shipCount = await kv.get('ship-count')

  if (!shipCount) {
    console.log('Refetching ships')
    const allShips = await base('ships').select({}).all()
    shipCount = allShips.length.toString()
    await kv.set('ship-count', shipCount, { ex: 60_000, nx: true })
  }

  const darkTheme = new URL(url).searchParams.get('theme') === 'dark'

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          color: darkTheme ? 'white' : 'black',
          background: 'transparent',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        🚢 {shipCount} projects shipped (and counting!)
      </div>
    ),
    {
      width: 1_200,
      height: 100,
    },
  )
}

/*

import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

let browser: puppeteer.Browser




const html = (shipCount: number) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { margin: 0 }
    main { display: flex; flex-direction: column; align-items: center; }
    h1 { font-family: sans-serif; text-align: center; }
  </style>
</head>
<body>
  <main>
    <h1>${shipCount} projects shipped</h1>
  </main>
</body>
</html>`



  const CHROME_EXECUTABLE_PATH =
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'

  const isLocal = false // Set this variable as required - @sparticuz/chromium does not work on ARM, so we use a standard Chrome executable locally - see issue https://github.com/Sparticuz/chromium/issues/186
  if (!browser?.isConnected()) {
    chromium.setHeadlessMode = true
    chromium.setGraphicsMode = false

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
  }

  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 800,
      height: 100,
      deviceScaleFactor: 3,
    })

    await page.setContent(html(123))

    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 100,
      },
    })

    await page.close()
    await browser.close()

    // Return the screenshot as a PNG
    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        // "Cache-Control": "public, max-age=3600"
      },
    })
  } catch (error) {
    await browser.close()
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
*/
