'use server'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.BASE_ID!,
)

//TODO: Delete this file it's weird
import { getWakaSessions } from '@/app/utils/waka'

export async function wakaSessions() {
  return await getWakaSessions()
}
