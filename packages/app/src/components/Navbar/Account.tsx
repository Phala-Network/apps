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

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 200px;
  padding: 10px;
  background: #d1ff52;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  margin-left: 20px;
  margin-right: 30px;
`

const AccountLable = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  margin-left: 20px;
  margin-right: 30px;
  background: #eeeeee;
  height: 36px;
  min-width: 300px;

  .unit {
    padding: 0 5px;
  }
`

const Balance = styled.span`
  padding: 0 10px;
  max-width: 300px;
  overflow: hidden;
`

const Address = styled.div`
  display: flex;
  align-items: center;
  background: #cecece;
  border: 1px solid #8c8c8c;
  box-sizing: border-box;
  height: 100%;
  width: 211px;
  padding: 0 10px;

  .name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
  }
`

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
        <Button
          onClick={openAccountSelectModal}
        >{`Connect Polkadot{.js}`}</Button>
      ) : (
        <AccountLable onClick={openAccountSelectModal}>
          <Balance>
            <BalanceLabel value={balanceValue} />
            <span className="unit">PHA</span>
          </Balance>
          <Address>
            <span className="name">{polkadotAccount?.name}</span>
            <span className="address">
              {trimAddress(polkadotAccount?.address)}
            </span>
          </Address>
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
