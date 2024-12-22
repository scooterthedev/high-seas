import puppeteer from 'puppeteer'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.BASE_ID!,
)

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

export async function GET() {
  const [browser, ships] = await Promise.all([
    puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }),
    base('ships').select({}).all(),
  ])

  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 800,
      height: 100,
      deviceScaleFactor: 3,
    })

    await page.setContent(html(ships.length))

    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 100,
      },
    })

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
