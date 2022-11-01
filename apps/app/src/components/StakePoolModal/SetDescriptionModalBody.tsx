import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {stringToHex} from '@polkadot/util'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {Cell, Grid} from 'baseui/layout-grid'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {Textarea} from 'baseui/textarea'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useEffect, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useStakePoolDescription, {
  StakePoolDescription,
} from '../../hooks/useStakePoolDescription'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const ANN_MAX_LENGTH = 240

const SetDescriptionModalBody: FC<
  {stakePool: Pick<StakePool, 'pid'>} & Pick<ModalProps, 'onClose'>
> = ({stakePool: {pid}, onClose}) => {
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const {data: initialDescription, isFetched} = useStakePoolDescription(
    String(pid)
  )
  const [confirmLock, setConfirmLock] = useState(false)
  const [telegramString, setTelegramString] = useState('')
  const [discordString, setDiscordString] = useState('')
  const [wechatString, setWechatString] = useState('')
  const [twitterString, setTwitterString] = useState('')
  const [emailString, setEmailString] = useState('')
  const [forumString, setForumString] = useState('')
  const [annString, setAnnString] = useState('')

  useEffect(() => {
    if (initialDescription) {
      setTelegramString(initialDescription.telegram ?? '')
      setDiscordString(initialDescription.discord ?? '')
      setWechatString(initialDescription.wechat ?? '')
      setTwitterString(initialDescription.twitter ?? '')
      setEmailString(initialDescription.email ?? '')
      setForumString(initialDescription.forum ?? '')
      setAnnString(initialDescription.ann ?? '')
    }
  }, [initialDescription])

  const extrinsic = useMemo(() => {
    const description: StakePoolDescription = {
      telegram: telegramString,
      discord: discordString,
      wechat: wechatString,
      twitter: twitterString,
      email: emailString,
      forum: forumString,
      ann: annString,
      version: 1,
    }
    const hex = stringToHex(JSON.stringify(description))
    if (api) {
      return api.tx.phalaStakePool.setPoolDescription(pid, hex)
    }
  }, [
    pid,
    api,
    annString,
    discordString,
    emailString,
    forumString,
    telegramString,
    twitterString,
    wechatString,
  ])

  const onConfirm = async () => {
    setConfirmLock(true)
    if (!extrinsic) return
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          onClose?.({closeSource: 'closeButton'})
          setConfirmLock(false)
        }
      })
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }

  return (
    <>
      <ModalHeader>Set Description</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <Grid gridMargins={0} gridColumns={2} gridGutters={12}>
          <Cell span={1}>
            <FormControl label="Telegram">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={telegramString}
                size="compact"
                onChange={(e) => setTelegramString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
          <Cell span={1}>
            <FormControl label="Discord">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={discordString}
                size="compact"
                onChange={(e) => setDiscordString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
          <Cell span={1}>
            <FormControl label="Wechat">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={wechatString}
                size="compact"
                onChange={(e) => setWechatString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
          <Cell span={1}>
            <FormControl label="Twitter">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={twitterString}
                size="compact"
                onChange={(e) => setTwitterString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
          <Cell span={1}>
            <FormControl label="Email">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={emailString}
                size="compact"
                onChange={(e) => setEmailString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
          <Cell span={1}>
            <FormControl label="Forum">
              <Input
                maxLength={30}
                disabled={!isFetched}
                value={forumString}
                size="compact"
                onChange={(e) => setForumString(e.currentTarget.value)}
              />
            </FormControl>
          </Cell>
        </Grid>
        <FormControl
          label="Announcement"
          caption={`Characters left: ${Math.max(
            ANN_MAX_LENGTH - annString.length,
            0
          )}`}
        >
          <Textarea
            maxLength={ANN_MAX_LENGTH}
            disabled={!isFetched}
            placeholder="Future plans, such as adding workers, changing stake, changing commission, etc. (optional)"
            value={annString}
            size="compact"
            onChange={(e) => setAnnString(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default SetDescriptionModalBody
