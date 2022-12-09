import {BasePoolKind, DelegationCommonFragment} from '@/lib/subsquidQuery'
import Decimal from 'decimal.js'
import {FC, useRef, useState} from 'react'

const PREFIX =
  'https://nft-assets.phala.world/delegation_nft/Delegation_NFT_with_card'

const getNftCover = (kind: BasePoolKind, value: Decimal | string) => {
  const level = Decimal.log10(new Decimal(value).div(10).ceil().times(10))
    .ceil()
    .toString()

  return `${PREFIX}/${kind}/${kind}0${level}_01.mp4`
}

const NftCover: FC<{delegation: DelegationCommonFragment}> = ({delegation}) => {
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
        src={getNftCover(delegation.basePool.kind, delegation.value)}
        type="video/mp4"
      ></source>
    </video>
  )
}

export default NftCover
