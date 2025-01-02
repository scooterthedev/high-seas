'use server'

import { cookies } from 'next/headers'
import { HsSession, sessionCookieName, signAndSet, verifySession } from './auth'
import { getPersonByMagicToken } from './airtable'

export async function createMagicSession(magicCode: string) {
  try {
    const partialPersonData = await getPersonByMagicToken(magicCode)
    if (!partialPersonData)
      throw new Error(`Failed to look up Person by magic code: ${magicCode}`)

    const { id, email, slackId } = partialPersonData

    console.log('SOTNRESTNSREINTS', { id, email, slackId })

    const session: HsSession = {
      personId: id,
      authType: 'magic-link',
      slackId,
      email,
    }

    await signAndSet(session)
  } catch (error) {
    console.error('Error creating Magic session:', error)
    throw error
  }
}

export async function getSession(): Promise<HsSession | null> {
  try {
    const sessionCookie = cookies().get(sessionCookieName)
    if (!sessionCookie) return null

    const unsafeSession = JSON.parse(sessionCookie.value)
    return verifySession(unsafeSession)
  } catch (error) {
    console.error('Error verifying session:', error)
    return null
  }
}
