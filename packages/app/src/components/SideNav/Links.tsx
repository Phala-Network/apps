import {useTranslation} from '@phala/react-i18n'
import styled from 'styled-components'
import ActiveOutline from './ActiveOutline'
import Link from './Link'

const Divider = styled.div`
  border-top: 1px solid #494949;
  margin: 14px 0;
`

const Links: React.FC = () => {
  const {t} = useTranslation()

  return (
    <div id="navLinks" style={{position: 'relative', paddingTop: 1}}>
      <ActiveOutline />

      <Link to="/">{t('Assets')}</Link>
      <Link to="/bridge/">{t('Bridge')}</Link>
      <Link to="/delegate/">{t('Delegate')}</Link>
      <Divider></Divider>
      <Link to="/mining/">{t('Mining')}</Link>
      <Link to="/analytics/">{t('Analytics')}</Link>

      {/* <Link to="/darkpool">Darkpool</Link> */}
      {/* <Link to="/tokens">Tokens</Link> */}
      {/* <Link to="/transactions">Transactions</Link> */}
      {/* <Link to="/crowdloan">KSM Crowdloan</Link> */}
    </div>
  )
}

export default Links
