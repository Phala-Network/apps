import * as Sentry from '@sentry/react'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Button from '../../../Button'
import ErrorText from '../../../ErrorText'
import Input from '../../../Input'
import Modal, { ModalAction, ModalActions, ModalProps } from '../../../Modal'
import Spacer from '../../../Spacer'
import Textarea from '../../../Textarea'

const Description = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #878787;
  margin-top: -15px;
  margin-bottom: 25px;
`

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const FeedbackModal: React.FC<ModalProps> = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comments, setComments] = useState('')
  const [error, setError] = useState('')

  const submit = async () => {
    let error = ''

    if (!name) {
      error = 'Please input your name'
    }

    if (!email) {
      error = 'Please input your email'
    }

    if (!validateEmail(email)) {
      error = 'Please check your email format'
    }

    if (!comments) {
      error = 'Please input your comments'
    }

    if (error) {
      setError(error)
      return
    } else {
      setError('')
    }

    const eventId = Sentry.captureMessage('feedback')
    const bodyFormData = new FormData()

    bodyFormData.append('name', name)
    bodyFormData.append('email', email)
    bodyFormData.append('comments', comments)

    try {
      await axios({
        method: 'post',
        url: 'https://sentry.io/api/embed/error-page/',
        data: bodyFormData,
        params: {
          eventId,
          dsn:
            'https://ba6cd9ff61544ca6a96f3ca1d90445f2@o812739.ingest.sentry.io/5879132',
        },
      })
    } catch (e) {
      console.error(e)
    }

    toast('Success: send feedback')

    props.onClose?.()
  }

  return (
    <Modal title={"It looks like we're having issues."} {...props}>
      <Description>
        Our team has been notified. If you’d like to help, tell us what happened
        below.
      </Description>

      <Input
        onChange={setName}
        name="name"
        size="large"
        placeholder="Name"></Input>

      <Spacer></Spacer>

      <Input
        onChange={setEmail}
        name="email"
        size="large"
        placeholder="Email"></Input>

      <Spacer></Spacer>

      <Textarea
        onChange={setComments}
        name="description"
        rows={6}
        placeholder="What Happened?"></Textarea>

      <ModalActions>
        <ModalAction>
          <Button onClick={() => props.onClose?.()}>Close</Button>
        </ModalAction>
        <ModalAction>
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        </ModalAction>
      </ModalActions>

      <ErrorText style={{ textAlign: 'right' }}>{error}</ErrorText>
    </Modal>
  )
}

export default FeedbackModal
