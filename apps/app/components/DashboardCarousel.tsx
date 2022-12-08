import b1 from '@/assets/b1.jpeg'
import b2 from '@/assets/b2.png'
import {Box, LinearProgress, Stack} from '@mui/material'
import {FC, useState} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const contents: {name?: string; imageUrl: string; href?: string}[] = [
  {
    name: 'Phala App 2.0',
    href: 'https://medium.com/phala-network/discover-phala-apps-exciting-new-features-which-make-your-delegation-smarter-791ef80c3b6d',
    imageUrl: b1.src,
  },
  {
    name: 'Vaults feature',
    href: 'https://medium.com/phala-network/vaults-simplifying-and-optimizing-your-phala-delegations-368469608ea7',
    imageUrl: b2.src,
  },
]

const DashboardCarousel: FC = () => {
  const [progress, setProgress] = useState(Math.floor(100 / contents.length))
  return (
    <Stack height="100%">
      <Carousel
        css={{
          flex: 1,
          '.react-multi-carousel-track': {
            height: '100%',
          },
        }}
        draggable={false}
        autoPlay
        autoPlaySpeed={10000}
        infinite
        pauseOnHover
        responsive={{
          all: {
            breakpoint: {min: 0, max: 4000},
            items: 1,
          },
        }}
        beforeChange={(next) => {
          setProgress(
            Math.floor((100 / contents.length) * ((next % contents.length) + 1))
          )
        }}
      >
        {contents.map((content, index) => (
          <Box
            component={content.href ? 'a' : 'div'}
            href={content.href}
            target="_blank"
            display="block"
            width="100%"
            height="100%"
            sx={{
              backgroundImage: `url(${content.imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center left',
            }}
            key={index}
          ></Box>
        ))}
      </Carousel>
      <LinearProgress variant="determinate" value={progress} />
    </Stack>
  )
}

export default DashboardCarousel
