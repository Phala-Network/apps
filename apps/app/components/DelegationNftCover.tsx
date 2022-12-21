import {BasePoolKind} from '@/lib/subsquidQuery'
import {addMonths, addWeeks, addYears, isBefore} from 'date-fns'
import Decimal from 'decimal.js'
import {FC, useRef, useState} from 'react'

type CoverVariant = 'dashboard' | 'delegation'

const PREFIX = 'https://nft-assets.phala.world/delegation_nft/Delegation_NFT_'

const getNftCover = (
  variant: CoverVariant,
  kind: BasePoolKind,
  value: Decimal | string,
  mintTimeString?: string | null
) => {
  const level = Decimal.log10(new Decimal(value).div(10).ceil().times(10))
    .ceil()
    .toString()

  let color = '01'
  if (mintTimeString) {
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

  return `${PREFIX}${
    variant === 'dashboard' ? 'without_card' : 'with_card'
  }/${kind}/${
    variant === 'dashboard' && kind === 'StakePool' ? 'Stake' : kind
  }0${level}_${color}.mp4`
}

const DelegationNftCover: FC<{
  variant: CoverVariant
  delegation: {basePool: {kind: BasePoolKind}; value: string}
  nft: {mintTime?: string | null}
}> = ({variant, delegation, nft}) => {
  const [loop, setLoop] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <video
      playsInline
      preload="auto"
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.play()
        }
        setLoop(true)
      }}
      onMouseLeave={() => {
        setLoop(false)
      }}
      onPause={() => {
        if (ref.current) {
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
      <source
        src={getNftCover(
          variant,
          delegation.basePool.kind,
          delegation.value,
          nft.mintTime
        )}
        type="video/mp4"
      ></source>
    </video>
  )
}

export default DelegationNftCover
