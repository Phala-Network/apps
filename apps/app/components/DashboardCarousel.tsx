import b1 from '@/assets/b1.png'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import {Box, IconButton, LinearProgress, Stack} from '@mui/material'
import {useInterval} from '@phala/lib'
import Link from 'next/link'
import {type FC, useMemo, useState} from 'react'
import {useSnapCarousel} from 'react-snap-carousel'

const contents: Array<{name: string; imageUrl: string; href: string}> = [
  {
    name: 'Claim Khala Assets',
    href: '/khala-assets',
    imageUrl: b1.src,
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
