import type {BasePoolKind} from '@/lib/subsquidQuery'
import {addMonths, addWeeks, addYears, isBefore} from 'date-fns'
import Decimal from 'decimal.js'
import {type FC, useMemo, useRef, useState} from 'react'

type CoverVariant = 'dashboard' | 'delegation'

const PREFIX = 'https://nft-assets2.phala.world/delegation_nft/Delegation_NFT_'

const getNftCover = (
  variant: CoverVariant,
  kind: BasePoolKind,
  value: Decimal | string,
  mintTimeString?: string | null,
): {video: string; poster: string} => {
  const level = Decimal.log10(new Decimal(value).div(10).ceil().times(10))
    .ceil()
    .toString()

  let color = '01'
  if (mintTimeString != null) {
    const now = new Date()
    const mintTime = new Date(mintTimeString)
    if (isBefore(addYears(mintTime, 1), now)) {
      color = '06'
    } else if (isBefore(addMonths(mintTime, 6), now)) {
      color = '05'
    } else if (isBefore(addMonths(mintTime, 3), now)) {
      color = '04'
    } else if (isBefore(addMonths(mintTime, 1), now)) {
      color = '03'
    } else if (isBefore(addWeeks(mintTime, 1), now)) {
      color = '02'
    }
  }

  return {
    video: `${PREFIX}${
      variant === 'dashboard' ? 'without_card_new' : 'with_card'
    }/${kind}/${
      variant === 'dashboard' && kind === 'StakePool' ? 'Stake' : kind
    }0${level}_${color}.mp4`,
    poster: `${PREFIX}${
      variant === 'dashboard' ? 'jpg_without_card' : 'jpg_with_card'
    }/${variant === 'dashboard' && kind === 'StakePool' ? 'Stakepool' : kind}/${
      variant === 'dashboard' && kind === 'StakePool' ? 'Stake' : kind
    }0${level}_${color}.jpg`,
  }
}

const DelegationNftCover: FC<{
  variant: CoverVariant
  delegation: {basePool: {kind: BasePoolKind}; value: string}
  nft?: {mintTime?: string | null} | null
}> = ({variant, delegation, nft}) => {
  const [loop, setLoop] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  const {video, poster} = useMemo(
    () =>
      getNftCover(
        variant,
        delegation.basePool.kind,
        delegation.value,
        nft?.mintTime,
      ),
    [variant, delegation.basePool.kind, delegation.value, nft?.mintTime],
  )
  return (
    <video
      poster={poster}
      playsInline
      preload="auto"
      ref={ref}
      onMouseEnter={() => {
        if (ref.current != null) {
          void ref.current.play()
        }
        setLoop(true)
      }}
      onMouseLeave={() => {
        setLoop(false)
      }}
      onPause={() => {
        if (ref.current != null) {
          ref.current.currentTime = 0
        }
      }}
      loop={loop}
      muted
      css={{
        objectFit: 'cover',
        background: 'black',
        width: '100%',
        height: '100%',
      }}
    >
      <source src={video} type="video/mp4" />
    </video>
  )
}

export default DelegationNftCover
