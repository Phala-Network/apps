import {BalanceLabel, SelectAccountModal} from '@phala/react-components'
import {useBalance, useSSR} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'

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

const AccountLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  background: #eeeeee;
  margin-right: 16px;
  height: 36px;

  ${down('lg')} {
    font-size: 14px;
    line-height: 14px;
    margin-right: 10px;
  }

  ${down('md')} {
    margin-right: 0;
  }
`

const Balance = styled.span`
  padding: 0 12px;
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
  padding: 0 12px;

  svg {
    width: 100%;
    display: block;
  }
`

const Name = styled.span`
  margin-right: 12px;
  max-width: 64px;
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
  const [currentAccount] = useCurrentAccount()
  const balance = useBalance(currentAccount?.address)
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  const balanceValue = useMemo(() => {
    if (!api || !balance || !decimals) return
    return new Decimal(balance.toString() || '0').div(decimals)
  }, [api, balance, decimals])

  const {isServer} = useSSR()

  const WalletIcon = currentAccount?.wallet?.logo.src as unknown as
    | FC
    | undefined

  if (isServer) return null

  return (
    <>
      {!currentAccount ? (
        <Connect onClick={openAccountSelectModal}>{`Connect Wallet`}</Connect>
      ) : (
        <AccountLabel>
          <Balance>
            <BalanceLabel value={balanceValue} />
            <span className="unit">PHA</span>
          </Balance>
          <AccountInfo onClick={openAccountSelectModal}>
            {WalletIcon && (
              <Block marginRight="scale400" width="20px">
                <WalletIcon />
              </Block>
            )}
            <Name>{currentAccount?.name}</Name>
            <Address>{trimAddress(currentAccount.address)}</Address>
          </AccountInfo>
        </AccountLabel>
      )}
      <SelectAccountModal
        dappName="Phala App"
        onClose={() => setSelectAccountModalViable(false)}
        isOpen={selectAccountModalViable}
      />
    </>
  )
}

export default Account
