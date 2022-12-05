import {FC, useRef, useState} from 'react'

const NftCover: FC = () => {
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
        src="https://navyjfdngjyxa2vsqj6nhlsiez2kz4dvw6xwawe2tpqza2nzryyq.arweave.net/aCuElG0ycXBqsoJ8065IJnSs8HW3r2BYmpvhkGm5jjE"
        type="video/mp4"
      ></source>
    </video>
  )
}

export default NftCover
