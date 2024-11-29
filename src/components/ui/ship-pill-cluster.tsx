import type { Ship } from '@/app/utils/data'
import Pill from './pill'

import DoubloonsImage from '/public/doubloon.svg'
import Image from 'next/image'
import pluralize from '../../../lib/pluralize'

export default function ShipPillCluster({
  chain,
  transparent = false,
}: {
  chain: Ship[]
  transparent: boolean
}) {
  const shipUpdateCount = chain.length - 1
  const roundedPayout = Math.round(
    chain.reduce((acc, curr) => (acc += curr.doubloonPayout), 0),
  )
  const roundedHr = chain
    .reduce((acc, curr) => (acc += curr.total_hours ?? 0), 0)
    .toFixed(2)

  const allShipsHaveVoteRequirementMet = !chain.some(
    (s) => !s.voteRequirementMet,
  )

  return (
    <>
      {chain[0].shipStatus === 'shipped' ? (
        <>
          <Pill
            classes={`${transparent && 'bg-white/15 text-white'}`}
            msg={pluralize(roundedHr, 'hr', true)}
            glyph="clock"
          />

          {allShipsHaveVoteRequirementMet ? (
            chain.at(-1)?.doubloonPayout != null ? (
              <Pill
                classes={`${transparent && 'bg-white/15 text-white'}`}
                msg={pluralize(roundedPayout, 'doubloon', true)}
                glyphImage={
                  <Image src={DoubloonsImage} alt="doubloons" height={20} />
                }
              />
            ) : (
              <Pill
                classes={`${transparent && 'bg-white/15 text-white'}`}
                msg={`Awaiting ${10 - chain.at(-1)?.matchups_count} more ${pluralize(
                  10 - chain.at(-1)?.matchups_count,
                  'vote',
                  false,
                )} from other pirates…`}
                color="blue"
                glyph="event-add"
                percentage={Math.max(chain.at(-1)?.matchups_count * 10, 5)}
              />
            )
          ) : (
            <Pill
              classes={`${transparent && 'bg-white/15 text-white'}`}
              msg={'Pending: Vote to unlock payout!'}
              color="blue"
              glyph="enter"
            />
          )}
        </>
      ) : (
        <Pill
          classes={`${transparent && 'bg-white/15 text-white'}`}
          msg="pending ship"
          glyph="clock"
        />
      )}
      {shipUpdateCount > 0 ? (
        <Pill
          classes={`${transparent && 'bg-white/15 text-white'}`}
          msg={pluralize(shipUpdateCount, 'update', true)}
          color="purple"
          glyph="reply"
          glyphStyles={{ transform: 'scaleX(-1)' }}
        />
      ) : null}
    </>
  )
}
