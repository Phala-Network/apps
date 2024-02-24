import b2 from '@/assets/b2.png'
import b3 from '@/assets/b3.png'
import b4 from '@/assets/b4.png'
import b6 from '@/assets/b6.png'
import b7 from '@/assets/b7.png'
import b8 from '@/assets/b8.jpg'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import {Box, IconButton, LinearProgress, Stack} from '@mui/material'
import {useInterval} from '@phala/lib'
import Link from 'next/link'
import {type FC, useMemo, useState} from 'react'
import {useSnapCarousel} from 'react-snap-carousel'

const contents: Array<{name: string; imageUrl: string; href: string}> = [
  {
    name: 'Claim subsidies',
    href: '/khala/subsidy',
    imageUrl: b8.src,
  },
  {
    name: 'Launch Gemini Tokenomic on Phala',
    href: 'https://khala.subsquare.io/democracy/referendum/89',
    imageUrl: b7.src,
  },
  {
    name: 'Phala World Marketplace',
    href: 'https://phala.world/marketplace',
    imageUrl: b6.src,
  },
  {
    name: 'Vaults feature',
    href: 'https://medium.com/phala-network/vaults-simplifying-and-optimizing-your-phala-delegations-368469608ea7',
    imageUrl: b2.src,
  },
  {
    name: `Phala App's Share`,
    href: 'https://medium.com/phala-network/share-tracking-pool-ownership-9fdef274f3ae',
    imageUrl: b3.src,
  },
  {
    name: 'Phala App 2.0 Instructions',
    href: 'https://forum.phala.network/t/phala-app-2-0-main-functions-instructions/3799',
    imageUrl: b4.src,
  },
]

const DashboardCarousel: FC = () => {
  const [hover, setHover] = useState(false)
  const {
    scrollRef,
    activePageIndex,
    prev: originalPrev,
    next: originalNext,
    goTo,
  } = useSnapCarousel()

  const prev = (): void => {
    if (activePageIndex === 0) {
      goTo(contents.length - 1)
    } else {
      originalPrev()
    }
  }

  const next = (): void => {
    if (activePageIndex === contents.length - 1) {
      goTo(0)
    } else {
      originalNext()
    }
  }

  const progress = useMemo(() => {
    return Math.floor(((activePageIndex + 1) / contents.length) * 100)
  }, [activePageIndex])

  useInterval(
    () => {
      next()
    },
    hover ? null : 5000,
  )

  return (
    <Stack
      height="100%"
      position="relative"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <Stack
        flex={1}
        width="100%"
        direction="row"
        overflow="auto"
        sx={{
          scrollSnapType: 'x mandatory',
          '::-webkit-scrollbar': {display: 'none'},
          scrollbarWidth: 'none',
        }}
        ref={scrollRef}
      >
        {contents.map((content) => {
          const isExternal = content.href.startsWith('http')
          return (
            <Box
              component={isExternal ? 'a' : Link}
              href={content.href}
              shallow={isExternal ? undefined : true}
              {...(isExternal && {target: '_blank'})}
              display="block"
              width="100%"
              height="100%"
              flexShrink={0}
              sx={{
                backgroundImage: `url(${content.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center left',
                scrollSnapAlign: 'start',
              }}
              key={content.name}
            />
          )
        })}
      </Stack>
      <LinearProgress variant="determinate" value={progress} />
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
        }}
        onClick={prev}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: 0,
        }}
        onClick={next}
      >
        <ArrowForwardIos />
      </IconButton>
    </Stack>
  )
}

export default DashboardCarousel
