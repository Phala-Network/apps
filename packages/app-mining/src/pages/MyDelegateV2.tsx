import {useInterval} from '@phala/react-hooks'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import {Link} from 'gatsby'
import {ChevronLeft} from 'react-feather'
import {Helmet} from 'react-helmet'
import ClaimAll from '../components/ClaimAll'
import MyDelegateNotification from '../components/MyDelegateNotification'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBar from '../components/StatusBarV2'

export const MyDelegateV2 = () => {
  useInterval(() => {
    window.location.reload()
  }, 60 * 10 * 1000)

  return (
    <Block
      maxWidth="1700px"
      margin="0 auto"
      paddingLeft="scale650"
      paddingRight="scale650"
      paddingBottom="scale2400"
    >
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <StatusBar />

      <MyDelegateNotification />

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '0',
              ...$theme.borders.border200,
            }),
          },
        }}
      >
        <Block
          display="flex"
          justifyContent="space-between"
          marginBottom="scale600"
          flexWrap
        >
          <Block display="flex" alignItems="center">
            <Link to="/delegate/">
              <Button size="compact" kind="tertiary">
                <ChevronLeft />
              </Button>
            </Link>
            <HeadingMedium as="div">My Delegate</HeadingMedium>
          </Block>

          <ClaimAll />
        </Block>

        <StakePoolTableV2 kind="myDelegate" />
      </Card>
    </Block>
  )
}
