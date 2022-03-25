import {FormLabel, Input, InputNumber} from '@phala/react-components'
import {validateAddress} from '@phala/utils'
import {ApiPromise, Keyring} from '@polkadot/api'
import {Button} from 'baseui/button'
import BN from 'bn.js'
import {useCallback, useEffect, useState} from 'react'
import {
  transferAssetsKhalaAccounts,
  transferKARFromKaruraToKhala,
  transferKARFromKhalaToKarura,
  transferPHAFromKaruraToKhala,
  transferPHAFromKhalaToKarura,
} from './components/TransferModal/transfer'
import {getBaseInfo} from './components/TransferModal/xtransfer'

const bn1e12 = new BN(10).pow(new BN(12))

export const BridgePageTest = () => {
  const [messages, setMessages] = useState<string[]>([])

  const [khalaApi, setKhalaApi] = useState<ApiPromise>()
  const [karuraApi, setKaruraApi] = useState<ApiPromise>()
  const [karuraAccount, setKaruraAccount] = useState<any>()
  const [khalaAccount, setKhalaAccount] = useState<any>()

  const [karuraAccountAddressInput, setKaruraAccountAddressInput] =
    useState<string>('')
  const [khalaAccountAddressInput, setKhalaAccountAddressInput] =
    useState<string>('')
  const [amount, setAmount] = useState<number>(1)

  useEffect(() => {
    getBaseInfo().then(({khalaApi, karuraApi}) => {
      setKhalaApi(khalaApi)
      setKaruraApi(karuraApi)
    })

    const keyring = new Keyring({type: 'sr25519'})
    // 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
    const karuraAccount = keyring.addFromUri('//Alice')
    // 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
    const khalaAccount = keyring.addFromUri('//Bob')

    setKaruraAccount(karuraAccount)
    setKaruraAccountAddressInput(karuraAccount.address)
    setKhalaAccount(khalaAccount)
    setKhalaAccountAddressInput(khalaAccount.address)
  }, [])

  const log = useCallback(
    (message: string) => {
      setMessages((messages) => [...messages, message])
    },
    [setMessages]
  )

  return (
    <div style={{padding: 20, margin: 20, flex: 1}}>
      <div>
        <div>
          <FormLabel>Karura address:</FormLabel>
          <Input
            value={karuraAccountAddressInput}
            onChange={(value) => {
              setKaruraAccountAddressInput(value)

              if (validateAddress(value)) {
                const keyring = new Keyring({type: 'sr25519'})
                const karuraAccount = keyring.addFromAddress(value)
                setKaruraAccount(karuraAccount)
              }
            }}
            size="large"
          />

          <FormLabel>Khala address:</FormLabel>
          <Input
            value={khalaAccountAddressInput}
            onChange={(value) => {
              setKhalaAccountAddressInput(value)

              if (validateAddress(value)) {
                const keyring = new Keyring({type: 'sr25519'})
                const khalaAccount = keyring.addFromAddress(value)
                setKhalaAccount(khalaAccount)
              }
            }}
            size="large"
          />

          <FormLabel>Amount:</FormLabel>
          <InputNumber
            value={amount}
            onChange={(value) => setAmount(new BN(value).toNumber())}
            size="large"
          />
        </div>
        <div>
          <Button
            onClick={() => {
              setMessages([])
              khalaApi &&
                transferPHAFromKhalaToKarura(
                  khalaApi,
                  khalaAccount,
                  karuraAccount,
                  bn1e12.mul(new BN(amount)),
                  log
                )
            }}
          >
            transfer PHA From Khala To Karura
          </Button>

          <Button
            onClick={() => {
              setMessages([])
              karuraApi &&
                transferPHAFromKaruraToKhala(
                  karuraApi,
                  karuraAccount,
                  khalaAccount,
                  bn1e12.mul(new BN(amount)),
                  log
                )
            }}
          >
            transfer PHA From Karura To Khala
          </Button>

          <Button
            onClick={() => {
              setMessages([])
              karuraApi &&
                transferKARFromKaruraToKhala(
                  karuraApi,
                  karuraAccount,
                  khalaAccount,
                  bn1e12.mul(new BN(amount)),
                  log
                )
            }}
          >
            transfer KAR From Karura To Khala
          </Button>

          <Button
            onClick={() => {
              setMessages([])
              khalaApi &&
                transferKARFromKhalaToKarura(
                  khalaApi,
                  khalaAccount,
                  karuraAccount,
                  bn1e12.mul(new BN(amount)),
                  log
                )
            }}
          >
            transfer KAR From Khala To Karura
          </Button>

          <Button
            onClick={() => {
              setMessages([])
              khalaApi &&
                transferAssetsKhalaAccounts(
                  khalaApi,
                  khalaAccount,
                  karuraAccount,
                  bn1e12.mul(new BN(amount)),
                  log
                )
            }}
          >
            transfer PHA From Khala To Khala
          </Button>

          <ul>
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
