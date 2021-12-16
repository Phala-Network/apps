import {Button, FormLabel, Input, InputNumber} from '@phala/react-components'
import {ApiPromise, Keyring} from '@polkadot/api'
import BN from 'bn.js'
import {useCallback, useEffect, useState} from 'react'
import {
  getBaseInfo,
  transferKARFromKaruraToKhala,
  transferKARFromKhalaToKarura,
  transferPHAFromKaruraToKhala,
  transferPHAFromKhalaToKarura,
} from './xtransfer'

const bn1e12 = new BN(10).pow(new BN(12))

export const BridgePage = () => {
  const [messages, setMessages] = useState<string[]>([])

  const [khalaApi, setKhalaApi] = useState<ApiPromise>()
  const [karuraApi, setKaruraApi] = useState<ApiPromise>()
  const [karuraAccount, setKaruraAccount] = useState<any>()
  const [khalaAccount, setKhalaAccount] = useState<any>()
  const [amount, setAmount] = useState<number>(1)

  useEffect(() => {
    getBaseInfo().then(({khalaApi, karuraApi}) => {
      setKhalaApi(khalaApi)
      setKaruraApi(karuraApi)
    })

    const keyring = new Keyring({type: 'sr25519'})
    const karuraAccount = keyring.addFromUri('//Alice')
    const khalaAccount = keyring.addFromUri('//Bob')

    // from address
    // const testAccount = keyring.addFromAddress(
    //   '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    // )

    // console.log('testAccount', testAccount)

    setKaruraAccount(karuraAccount)
    setKhalaAccount(khalaAccount)
  }, [])

  const log = useCallback(
    (message: string) => {
      setMessages((messages) => [...messages, message])
    },
    [setMessages]
  )

  return (
    <div style={{padding: 20, margin: 20, background: 'white', flex: 1}}>
      <div>
        <FormLabel>Karura address:</FormLabel>
        <Input value={karuraAccount?.address} size="large" />

        <FormLabel>Khala address:</FormLabel>
        <Input value={khalaAccount?.address} size="large" />

        <FormLabel>Amount:</FormLabel>
        <InputNumber
          value={amount}
          onChange={(value) => setAmount(new BN(value).toNumber())}
          size="large"
        />
      </div>
      <div>
        <div style={{height: 20, width: 20}} />

        <Button
          type="primary"
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
          }}>
          transfer PHA From Khala To Karura
        </Button>

        <div style={{height: 20, width: 20}} />

        <Button
          type="primary"
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
          }}>
          transfer PHA From Karura To Khala
        </Button>

        <div style={{height: 20, width: 20}} />

        <Button
          type="primary"
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
          }}>
          transfer KAR From Karura To Khala
        </Button>

        <div style={{height: 20, width: 20}} />

        <Button
          type="primary"
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
          }}>
          transfer KAR From Khala To Karura
        </Button>

        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
