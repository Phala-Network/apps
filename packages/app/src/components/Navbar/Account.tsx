import {useState, useMemo} from 'react'
import styled from 'styled-components'
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
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  margin-right: 20px;
`

const AccountLable = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background: #eeeeee;
  margin-right: 20px;
  height: 36px;
`

const Balance = styled.span`
  padding: 0 16px;
  max-width: 300px;
  overflow: hidden;

  .unit {
    padding-left: 5px;
  }
`

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cecece;
  box-sizing: border-box;
  height: 100%;
  padding: 0 16px;
`
const Name = styled.span`
  margin-right: 16px;
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
`

const Address = styled.span``

const Account = (): JSX.Element => {
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

  return (
    <>
      {!polkadotAccount ? (
        <Connect
          onClick={openAccountSelectModal}
        >{`Connect Polkadot{.js}`}</Connect>
      ) : (
        <AccountLable onClick={openAccountSelectModal}>
          <Balance>
            <BalanceLabel value={balanceValue} />
            <span className="unit">PHA</span>
          </Balance>
          <AccountInfo>
            <Name>{polkadotAccount?.name}</Name>
            <Address>{trimAddress(polkadotAccount?.address)}</Address>
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
