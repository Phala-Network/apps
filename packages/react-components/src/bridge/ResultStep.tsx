import {
  Address,
  AmountInfo,
  Button,
  Copy,
  InfoTitle,
  InputExternalInfo,
  ModalAction,
  ModalActions,
  Spacer,
} from '..'
import React from 'react'
import styled from 'styled-components'
import { StepProps } from './BridgeProcess'
import FormItem from './FormItem'
import FormLayout from './FormLayout'

type Props = {
  onNext: () => void
} & StepProps

const AddressInfoBlackPanel = styled.div`
  background: #494949;
  padding: 12px;
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #ffffff;
  word-break: break-all;
  max-width: 500px;
  color: ${(p) => p.theme.colors.phala};
`

const AddressOfAmountInfo = styled.div`
  display: flex;
`

const Tip = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 26px;
  color: #494949;
`

const ResultStep: React.FC<Props> = (props) => {
  const { onNext, layout } = props
  const address = 'DaqqGMuj31iFen9zdHxrqebvXhp2bt8rDJge3X3hQuAMkBr'

  return (
    <>
      <FormLayout layout={layout}>
        <FormItem>
          <InfoTitle>From</InfoTitle>
          <AmountInfo
            style={{ backgroundColor: '#FFC786' }}
            amount={12345.67891}>
            <AddressOfAmountInfo>
              <div>
                <Tip>Please recharge to the following address</Tip>

                <AddressInfoBlackPanel>
                  <span>{address}</span>
                  <Copy value={address}></Copy>
                </AddressInfoBlackPanel>
              </div>
              <Spacer x={0.6}></Spacer>
            </AddressOfAmountInfo>
          </AmountInfo>
        </FormItem>

        <Spacer></Spacer>

        <FormItem>
          <InfoTitle>To</InfoTitle>
          <AmountInfo amount={67891.12345}>
            <Address>{address}</Address>
          </AmountInfo>
          <InputExternalInfo
            style={{ textAlign: 'right' }}
            label="Balance"
            value={1234.56789}
            type={'PHA'}
          />
        </FormItem>
      </FormLayout>

      <ModalActions>
        <ModalAction>
          <Button type="primary" onClick={onNext}>
            Done
          </Button>
        </ModalAction>
      </ModalActions>
    </>
  )
}

export default ResultStep
