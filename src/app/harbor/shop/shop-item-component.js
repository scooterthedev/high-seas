import { motion } from 'framer-motion'

import { useEventEmitter } from '../../../../lib/useEventEmitter'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { cantAffordWords, purchaseWords, sample } from '../../../../lib/flavor'
import Icon from '@hackclub/icons'
import { transcript } from '../../../../lib/transcript'
const ActionArea = ({ item, filterIndex, affordable }) => {
  const buyWord = useMemo(() => sample(purchaseWords), [item.id])
  const getYourRacksUp = useMemo(() => sample(cantAffordWords), [item.id])

  if (filterIndex == 0) {
    return <Button disabled={true}>pick a region to buy!</Button>
  }
  if (item.comingSoon) {
    return <Button disabled={true}>🕑 coming soon...</Button>
  }
  if (item.outOfStock) {
    return <Button disabled={true}>out of stock...</Button>
  }
  if (!affordable) {
    return <Button disabled={true}>💸 {getYourRacksUp}</Button>
  }
  return (
    <form action={`/api/buy/${item.id}`} className="w-full">
      <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 text-3xl enchanted">
        {buyWord}
      </Button>
    </form>
  )
}

export const ShopItemComponent = ({
  item,
  filterIndex,
  personTicketBalance,
  id,
  setFavouriteItems,
  favouriteItems,
}) => {
  const cardHoverProps = {
    whileHover: {
      scale: 1.05,
    },
  }
  const localPrice = filterIndex == 1 ? item.priceUs : item.priceGlobal
  const affordable = localPrice <= parseInt(personTicketBalance)

  const { emitYap } = useEventEmitter()

  const handleFavouriteToggle = () => {
    setFavouriteItems((prevFav) => {
      if (prevFav.includes(item.id)) {
        emitYap(
          transcript('fav.removed', {
            name: item.name,
            price: item.priceGlobal,
          }),
        )
        return prevFav.filter((favItem) => String(favItem) !== item.id)
      } else {
        if (Math.random() > 0.5) {
          let interaction = transcript('fav.added', {
            name: item.name,
            price: localPrice,
            affordable,
          })
          if ((affordable && Math.random() > 0.9)) {
            interaction +=
              ' ' +
              transcript('fav.addedCanAffort', {
                name: item.name,
                price: localPrice,
              })
          }
          emitYap(interaction)
        }
        return [...prevFav, item.id]
      }
    })
  }

  return (
    <motion.div {...cardHoverProps}>
      <Card
        id={id}
        className="h-full flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
      >
        <CardHeader className="pb-2">
          <div className="justify-between inline-block items-start">
            <CardTitle className="text-xl font-bold text-center">
              {item.name}
            </CardTitle>
          </div>
          <hr />
          <p
            className="text-sm text-gray-600 mt-1"
            dangerouslySetInnerHTML={{ __html: item.subtitle ?? '' }}
          ></p>

          <p className="inline-flex gap-3 items-center">
            <span className="text-green-500 font-semibold flex items-center">
              <img
                src="doubloon.svg"
                alt="doubloons"
                width={20}
                height={20}
                className="mr-1"
              />
              {localPrice}
            </span>

            {item.minimumHoursEstimated && item.maximumHoursEstimated ? (
              <span className="text-xs text-gray-600">
                ({Math.round(item.minimumHoursEstimated)} -{' '}
                {Math.round(item.maximumHoursEstimated)} hours)
              </span>
            ) : null}
          </p>
        </CardHeader>
        {item.imageUrl && (
          <CardContent className="p-0 flex-grow">
            <div className="h-48 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </CardContent>
        )}

        <CardFooter className="pt-4 flex gap-1 ">
          <ActionArea
            item={item}
            filterIndex={filterIndex}
            affordable={affordable}
          />
          <Button onClick={handleFavouriteToggle}>
            <Icon
              glyph={favouriteItems.includes(item.id) ? 'like-fill' : 'like'}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
