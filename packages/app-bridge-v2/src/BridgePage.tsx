import {Button} from '@phala/react-components'
import {ApiPromise, Keyring} from '@polkadot/api'
import BN from 'bn.js'
import {useEffect, useState} from 'react'
import {
  getBaseInfo,
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

  useEffect(() => {
    getBaseInfo().then(({khalaApi, karuraApi}) => {
      setKhalaApi(khalaApi)
      setKaruraApi(karuraApi)
    })

    const keyring = new Keyring({type: 'sr25519'})
    const karuraAccount = keyring.addFromUri('//Alice')
    const khalaAccount = keyring.addFromUri('//Bob')

    setKaruraAccount(karuraAccount)
    setKhalaAccount(khalaAccount)
  }, [])

  return (
    <div style={{padding: 20, margin: 20}}>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setMessages([])
            khalaApi &&
              transferPHAFromKhalaToKarura(
                khalaApi,
                khalaAccount,
                karuraAccount,
                bn1e12.mul(new BN(100)),
                (message) => {
                  setMessages((messages) => [...messages, message])
                }
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
                bn1e12.mul(new BN(50)),
                (message) => {
                  setMessages((messages) => [...messages, message])
                }
              )
          }}>
          transfer PHA From Karura To Khala
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
