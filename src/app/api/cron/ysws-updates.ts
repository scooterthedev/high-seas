import { withLock } from '../../../../lib/redis-lock'
import Airtable from 'airtable'

function and(...args: string[]) {
  if (args.length === 0) return 'TRUE()'
  if (args.length === 1) return args[0]
  return `AND(${args.join(',')})`
}

function uniq(arr) {
  return Array.from(new Set(arr))
}

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: process.env.AIRTABLE_ENDPOINT_URL,
}).base('appTeNFYcUiYfGcR6')

async function createNewShipChains(): Promise<void> {
  await withLock('create-ship-chains', async () => {
    console.log('finding ysws to update')
    const shipchainsToMake = await base('ships')
      .select({
        filterByFormula: and(
          'ship_chain = BLANK()',
          'reshipped_from = BLANK()',
        ),
        maxRecords: 10,
      })
      .all()

    if (shipchainsToMake.length === 0) {
      console.log('no new chains to create')
      return
    }

    console.log('creating new ship chains!')
    await base('ship_chains').create(
      shipchainsToMake.map((ship) => ({
        fields: {
          ships: [ship.id],
        },
      })),
    )
  })
}

async function addToShipChains(): Promise<void> {
  await withLock('add-to-ship-chains', async () => {
    const shipsMissingChains = await base('ships')
      .select({
        filterByFormula: and(
          'ship_chain = BLANK()',
          'reshipped_from != BLANK()',
          'reshipped_to = BLANK()',
        ),
        maxRecords: 1,
      })
      .all()

    if (shipsMissingChains.length === 0) {
      console.log('no ships missing their chain')
      return
    }

    console.log('adding to ship chains!')

    for (let i = 0; i < shipsMissingChains.length; i++) {
      const leafShip = shipsMissingChains[i]
      const parentShipId = leafShip?.fields?.reshipped_from?.[0]
      const { chainID, shipsToUpdate } = await traceChain(parentShipId)
      if (chainID) {
        const shipsInChain = [...shipsToUpdate, leafShip.id]
        console.log(
          'Updating these ships',
          shipsInChain,
          'to use chain',
          chainID,
        )
        const shipChainRecord = await base('ship_chains').find(chainID)
        const oldLinkedShips = (shipChainRecord?.fields?.ships || []) as string[]
        const mergedShips = uniq(shipsInChain.concat(oldLinkedShips))

        await base('ship_chains').update([
          {
            id: chainID,
            fields: {
              ships: mergedShips,
            },
          },
        ])
      } else {
        console.log('no chain found')
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  })
}

// given a record ID, trace the chain of reshipped_from records until we find one with a chain
// also return a list of the traversed ships so we can update them all at once and save requests
async function traceChain(
  recordID: string,
): Promise<{ chainID: string | null; shipsToUpdate: string[] }> {
  console.log('tracing chain', recordID)
  const cursorRec = await base('ships').find(recordID)
  const cursorChainID = cursorRec?.fields?.ship_chain?.[0]
  if (cursorChainID) {
    return { chainID: cursorChainID, shipsToUpdate: [recordID] }
  } else {
    const parentShipID = cursorRec?.fields?.reshipped_from?.[0]
    if (!parentShipID) {
      return { chainID: null, shipsToUpdate: [recordID] }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { chainID, shipsToUpdate } = await traceChain(parentShipID)
    if (chainID) {
      return { chainID, shipsToUpdate: [recordID, ...shipsToUpdate] }
    }
  }
  return { chainID: null, shipsToUpdate: [recordID] }
}

export default async function yswsUpdates() {
  // find any root projects without chains
  await createNewShipChains()

  new Promise((resolve) => setTimeout(resolve, 1000))
  // find any leaf projects missing a chain
  await addToShipChains()
}
