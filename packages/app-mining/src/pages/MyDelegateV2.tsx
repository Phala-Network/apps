import {Helmet} from 'react-helmet'
import {Link} from 'gatsby'
import {HeadingMedium} from 'baseui/typography'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import {Button} from 'baseui/button'
import {ChevronLeft} from 'react-feather'
import {Card} from 'baseui/card'
import ClaimAll from '../components/ClaimAll'
import StatusBar from '../components/StatusBarV2'
import {Block} from 'baseui/block'

export const MyDelegateV2 = () => {
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
        >
          <Block display="flex" alignItems="center">
            <Link to="/delegate/">
              <Button size="compact" kind="minimal">
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
