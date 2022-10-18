import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import IframeResizer from 'iframe-resizer-react'
import {FC} from 'react'
import Head from '../components/Head'

const Analytics: FC = () => {
  const [css] = useStyletron()

  return (
    <Block marginTop="scale600" marginBottom="scale600">
      <Head title="Analytics" />
      <IframeResizer
        className={css({
          width: 'calc(100% + 32px)',
          border: 'none',
        })}
        src="https://mb.phala.network/public/dashboard/d3e95e99-dcd9-4469-ad32-7e5dbd388cc7#bordered=false"
      ></IframeResizer>
    </Block>
  )
}

export default Analytics
