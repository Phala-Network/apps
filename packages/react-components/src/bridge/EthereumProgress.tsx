import {useDepositRecordByHash} from '@phala/react-graph-chainbridge'
import {useTranslation} from '@phala/react-i18n'
import {useBridgePhalaRecordInfo, useEthereumGraphQL} from '@phala/react-libs'
import {useMemo} from 'react'
import Progress from './Progress'

type EthereumProgressParams = {
  transactionHash?: string
}
export const EthereumProgress: React.FC<EthereumProgressParams> = (props) => {
  const {t} = useTranslation()
  const {transactionHash} = props
  let link = ''

  if (transactionHash) {
    // if (isTest() || isDev()) {
    //   link = `https://kovan.etherscan.io/tx/${transactionHash}`
    // } else {
    link = `https://etherscan.io/tx/${transactionHash}`
    // }
  }

  const steps = [
    {
      text: t('transaction_send'),
    },
    {
      text: t('ethereum_confirmed'),
      link,
    },
    {
      text: t('relayer_confirmed'),
    },
    {
      text: t('khala_confirmed'),
    },
  ]

  const {client} = useEthereumGraphQL()
  const {data: record} = useDepositRecordByHash(transactionHash, client)

  const {events, proposal /*, hash */} = useBridgePhalaRecordInfo(
    record?.depositRecords?.[0]
  )

  const progressIndex = useMemo(() => {
    if (events?.execution !== undefined) {
      return 3
    }

    if (
      events?.approval !== undefined ||
      proposal?.unwrapOr(undefined)?.status?.isApproved === true
    ) {
      return 2
    }

    if (transactionHash) {
      return 1
    }

    return -1
  }, [events, proposal, transactionHash])

  return <Progress steps={steps} progressIndex={progressIndex}></Progress>
}
