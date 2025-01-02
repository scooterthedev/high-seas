// smh, man
import 'server-only'

export const getSelfPerson = async (slackId: string) => {
  const url = `https://middleman.hackclub.com/airtable/v0/${process.env.BASE_ID}/people`
  const filterByFormula = encodeURIComponent(`{slack_id} = '${slackId}'`)
  const response = await fetch(`${url}?filterByFormula=${filterByFormula}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'highseas.hackclub.com (getSelfPerson)',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  let data
  try {
    data = await response.json()
  } catch (e) {
    console.error(e, await response.text())
    throw e
  }
  return data.records[0]
}

export async function getPersonByAuto(num: string): Promise<{
  slackId: string
} | null> {
  const baseId = process.env.BASE_ID
  const apiKey = process.env.AIRTABLE_API_KEY
  const table = 'people'

  const url = `https://middleman.hackclub.com/airtable/v0/${baseId}/${table}?filterByFormula={autonumber}='${encodeURIComponent(num)}'`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'highseas.hackclub.com (getPersonByMagicToken)',
    },
  })

  if (!response.ok) {
    const err = new Error(`Airtable API error: ${await response.text()}`)
    console.error(err)
    throw err
  }

  const data = await response.json()
  if (!data.records || data.records.length === 0) return null

  const id = data.records[0].id
  const email = data.records[0].fields.email
  const slackId = data.records[0].fields.slack_id

  if (!id || !email || !slackId) return null

  return { slackId }
}

export async function getSelfPersonIdentifier(slackId: string) {
  const person = await getSelfPerson(slackId)
  return person.fields.identifier
}
