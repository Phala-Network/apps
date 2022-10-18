import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import {Link} from 'gatsby'
import {ChevronLeft} from 'react-feather'
import ClaimAll from '../../components/ClaimAll'
import Head from '../../components/Head'
import MyDelegateTableV2 from '../../components/MyDelegateTableV2'
import StatusBar from '../../components/StatusBarV2'

const MyDelegate = () => {
  return (
    <Block
      maxWidth="1700px"
      margin="0 auto"
      paddingLeft={[0, 'scale650']}
      paddingRight={[0, 'scale650']}
      paddingBottom="scale2400"
    >
      <Head title="My Delegate" />

      <StatusBar />

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '4px',
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

          <ClaimAll kind="delegate" />
        </Block>

        <MyDelegateTableV2 />
      </Card>
    </Block>
  )
}

export default MyDelegate
