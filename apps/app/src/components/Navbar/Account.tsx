import {useBalance, useSSR} from '@phala/react-hooks'
import {useApiPromise} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, trimAddress} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import Decimal from 'decimal.js'
import {useMemo, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {SelectAccountModal} from '../SelectAccountModal'

const Connect = styled.div`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: #d1ff52;
  font-size: 16px;
  color: #111111;
  margin-right: 20px;

  ${down('xl')} {
    font-size: 14px;
    margin-right: 10px;
  }
`

const AccountLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  background: #eeeeee;
  font-weight: 500;
  margin-right: 16px;
  height: 36px;

  ${down('xl')} {
    font-size: 14px;
    line-height: 14px;
    margin-right: 10px;
  }

  ${down('lg')} {
    margin-right: 0;
  }
`

const Balance = styled.span`
  padding: 0 8px;
  max-width: 200px;
  overflow: hidden;

  .unit {
    padding-left: 5px;
  }

  ${down('xl')} {
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
  padding: 0 6px;

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

  ${down('xl')} {
    margin-right: 0;
  }
`

const Address = styled.span`
  ${down('xl')} {
    display: none;
  }
`

const Account: React.FC = () => {
  const [css] = useStyletron()
  const [selectAccountModalViable, setSelectAccountModalViable] =
    useState(false)
  const openAccountSelectModal = () => setSelectAccountModalViable(true)
  const [currentAccount] = useCurrentAccount()
  const balance = useBalance(currentAccount?.address)
  const {api} = useApiPromise()

  const balanceValue = useMemo(() => {
    if (!api || !balance) return
    return new Decimal(balance.toString()).div(1e12)
  }, [api, balance])

  const {isServer} = useSSR()

  const walletIcon = currentAccount?.wallet?.logo.src

  if (isServer) return null

  return (
    <>
      {!currentAccount ? (
        <Connect onClick={openAccountSelectModal}>{`Connect Wallet`}</Connect>
      ) : (
        <AccountLabel>
          <Balance>
            {balanceValue ? formatCurrency(balanceValue) : '-'}
            <span className="unit">PHA</span>
          </Balance>
          <AccountInfo onClick={openAccountSelectModal}>
            {walletIcon && (
              <Block marginRight="scale400">
                <img
                  src={walletIcon}
                  className={css({
                    width: '20px',
                    display: 'block',
                  })}
                />
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
