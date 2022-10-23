import {useTransactionFee} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency} from '@phala/utils'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {Block} from 'baseui/block'
import {LabelSmall, ParagraphSmall} from 'baseui/typography'
import {FC} from 'react'

export const TransactionFeeLabel: FC<{
  action?: SubmittableExtrinsic<'promise'>
}> = ({action}) => {
  const [polkadotAccount] = useCurrentAccount()
  const fee = useTransactionFee(action, polkadotAccount?.address)

  return (
    <Block display="flex" alignItems="center">
      <LabelSmall>Fee: </LabelSmall>
      <ParagraphSmall as="div" marginLeft="scale100">
        {fee ? `${formatCurrency(fee, 6)} PHA` : '-'}
      </ParagraphSmall>
    </Block>
  )
}
