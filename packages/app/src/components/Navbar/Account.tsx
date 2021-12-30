import {useState, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {BalanceLabel, PolkadotAccountModal} from '@phala/react-components'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {trimAddress} from '@phala/utils'
import {useBalance} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'

const Connect = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 20px;
  background: #d1ff52;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  margin-right: 20px;

  ${down('lg')} {
    font-size: 14px;
    line-height: 14px;
    padding: 0 10px;
    margin-right: 10px;
  }
`

const AccountLable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  background: #eeeeee;
  margin-right: 20px;
  height: 36px;

  ${down('lg')} {
    font-size: 14px;
    line-height: 14px;
    margin-right: 10px;
  }
`

const Balance = styled.span`
  padding: 0 16px;
  max-width: 200px;
  overflow: hidden;

  .unit {
    padding-left: 5px;
  }

  ${down('lg')} {
    display: none;
  }
`

const AccountInfo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #cecece;
  box-sizing: border-box;
  height: 100%;
  padding: 0 16px;

  ${down('lg')} {
    padding: 0 10px;
  }
`
const Name = styled.span`
  margin-right: 16px;
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;

  ${down('lg')} {
    margin-right: 0;
  }
`

const Address = styled.span`
  ${down('lg')} {
    display: none;
  }
`

const Account: React.FC = () => {
  const [selectAccountModalViable, setSelectAccountModalViable] =
    useState(false)
  const openAccountSelectModal = () => setSelectAccountModalViable(true)
  const [polkadotAccount] = usePolkadotAccountAtom()
  const balance = useBalance(polkadotAccount?.address)
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  const balanceValue = useMemo(() => {
    if (!api || !balance || !decimals) return new Decimal(0)
    return new Decimal(balance.toString() || '0').div(decimals)
  }, [api, balance, decimals])

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(true)
  }, [])

  if (!isActive) {
    return null
  }

  return (
    <>
      {!polkadotAccount ? (
        <Connect onClick={openAccountSelectModal}>{`Connect Wallet`}</Connect>
      ) : (
        <AccountLable>
          <Balance>
            <BalanceLabel value={balanceValue} />
            <span className="unit">PHA</span>
          </Balance>
          <AccountInfo onClick={openAccountSelectModal}>
            <Name>{polkadotAccount?.name}</Name>
            <Address>{trimAddress(polkadotAccount.address)}</Address>
          </AccountInfo>
        </AccountLable>
      )}
      <PolkadotAccountModal
        onClose={() => setSelectAccountModalViable(false)}
        visible={selectAccountModalViable}
      />
    </>
  )
}

export default Account
