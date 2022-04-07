import {useCurrentAccount} from '@phala/app-store'
import {Button} from 'baseui/button'
import {ModalBody, ModalFooter, ModalHeader} from 'baseui/modal'
import {VFC} from 'react'

const AccountModalBody: VFC = () => {
  const [, setCurrentAccount] = useCurrentAccount()
  return (
    <>
      <ModalHeader>Select An Account</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            setCurrentAccount(null)
          }}
        >
          Disconnect
        </Button>
      </ModalFooter>
    </>
  )
}

export default AccountModalBody
