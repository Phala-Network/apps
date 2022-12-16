import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Notification} from 'baseui/notification'
import {FC} from 'react'

const Analytics: FC = () => {
  return (
    <Block
      display="flex"
      alignItems="center"
      marginTop="scale1200"
      justifyContent="center"
      flexDirection="column"
    >
      <Notification kind="info" overrides={{Body: {style: {width: 'auto'}}}}>
        <Block display="flex" alignItems="center">
          On-chain upgrading. Phala App 2.0 will be launched on 22nd Dec.
        </Block>
      </Notification>
      <Button
        overrides={{Root: {style: {marginTop: '24px'}}}}
        onClick={() =>
          window.open(
            'https://twitter.com/phalanetwork/status/1603743551351058434'
          )
        }
      >
        Learn More
      </Button>
    </Block>
  )
}

export default Analytics
