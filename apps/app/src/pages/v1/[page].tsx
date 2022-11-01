import {useLocation} from '@reach/router'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Notification} from 'baseui/notification'
import {navigate} from 'gatsby'
import {FC} from 'react'

const V1Page: FC = () => {
  const {pathname} = useLocation()
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
          The V1 page is officially retired, enter the new page to experience
          real-time data updates
        </Block>
      </Notification>
      <Button
        overrides={{Root: {style: {marginTop: '24px'}}}}
        onClick={() => navigate(pathname.replace(/^\/v1/, ''))}
      >
        Go to New Page
      </Button>
    </Block>
  )
}

export default V1Page
