import {useTranslation} from '@phala/react-i18n'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import Banner from '../components/Banner'
import MainTable from '../components/MainTable'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
  }
`

const Block = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
`

const Delegate = (): JSX.Element => {
  const {t} = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('delegate.delegate')}</title>
      </Helmet>

      <Wrapper>
        <Banner></Banner>

        <Block>
          <MainTable></MainTable>
        </Block>
      </Wrapper>
    </>
  )
}

export {default as MyDelegate} from './MyDelegate'
export default Delegate
