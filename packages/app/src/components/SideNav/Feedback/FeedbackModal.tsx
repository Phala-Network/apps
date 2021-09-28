import {
  Button,
  ErrorText,
  Input,
  Modal,
  ModalAction,
  ModalActions,
  ModalProps,
  Spacer,
  Textarea,
} from '@phala/react-components'
import {useTranslation} from '@phala/react-i18n'
import * as Sentry from '@sentry/react'
import axios from 'axios'
import React, {useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

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
  const {t} = useTranslation()

  const submit = async () => {
    let error = ''

    if (!name) {
      error = t('feedback.name_invalid')
    } else if (!email || !validateEmail(email)) {
      error = t('feedback.email_invalid')
    } else if (!comments) {
      error = t('feedback.comments_invalid')
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
          dsn: 'https://ba6cd9ff61544ca6a96f3ca1d90445f2@o812739.ingest.sentry.io/5879132',
        },
      })
    } catch (e) {
      console.error(e)
    }

    setName('')
    setEmail('')
    setComments('')

    toast(t('feedback.success'))

    props.onClose?.()
  }

  return (
    <Modal title={t('feedback.title')} {...props}>
      <Description>{t('feedback.description')}</Description>

      <Input
        onChange={setName}
        name="name"
        size="large"
        placeholder={t('feedback.name_placeholder')}
      ></Input>

      <Spacer></Spacer>

      <Input
        onChange={setEmail}
        name="email"
        size="large"
        placeholder={t('feedback.email_placeholder')}
      ></Input>

      <Spacer></Spacer>

      <Textarea
        onChange={setComments}
        name="description"
        rows={6}
        placeholder={t('feedback.comments_placeholder')}
      ></Textarea>

      <ModalActions>
        <ModalAction>
          <Button onClick={() => props.onClose?.()}>
            {t('feedback.close')}
          </Button>
        </ModalAction>
        <ModalAction>
          <Button type="primary" onClick={submit}>
            {t('feedback.submit')}
          </Button>
        </ModalAction>
      </ModalActions>

      <ErrorText style={{textAlign: 'right'}}>{error}</ErrorText>
    </Modal>
  )
}

export default FeedbackModal
