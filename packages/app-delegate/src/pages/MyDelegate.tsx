import {Button} from '@phala/react-components'
import {useTranslation} from '@phala/react-i18n'
import {Link} from 'gatsby-plugin-intl'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import MyDelegateTable from '../components/MyDelegateTable'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
  }
`

const Block = styled.div`
  padding: 20px;
  background: #fff;
`

const MyState = () => {
  const {t} = useTranslation()

  return (
    <Wrapper>
      <Helmet>
        <title>{t('delegate.my_delegated')}</title>
      </Helmet>
      <Link to="/delegate/">
        <Button>{t('delegate.back')}</Button>
      </Link>
      <Block>
        <MyDelegateTable />
      </Block>
    </Wrapper>
  )
}

export default MyState
