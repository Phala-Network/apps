import {Button} from '@phala/react-components'
import {useState} from 'react'
import {runTransferPHAFromKhalaToKarura} from './xtransfer'

export const BridgePage = () => {
  const [messages, setMessages] = useState<string[]>([])

  return (
    <div style={{padding: 20, margin: 20}}>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setMessages([])
            runTransferPHAFromKhalaToKarura((message) => {
              setMessages((messages) => [...messages, message])
            })
          }}>
          transfer PHA From Khala To Karura
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
