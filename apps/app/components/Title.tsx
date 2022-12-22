import Head from 'next/head'
import {FC} from 'react'

const Title: FC<{children: string}> = ({children}) => {
  return (
    <Head>
      <title>{`${children} | Phala App`}</title>
    </Head>
  )
}

export default Title
